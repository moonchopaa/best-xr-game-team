import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../public/game.js', import.meta.url), 'utf8');
const helpers = source.slice(source.indexOf('function artworkUrl('));
const loader = source.slice(source.indexOf('async function loadStory('), source.indexOf("$('loadingRetry').onclick"));
function fixture() {
 const elements = new Map();
 const requested = [];
 const art = { source: '', alt: '', assignments: 0,
  getAttribute() { return this.source; },
  set src(value) { this.source = value; this.assignments++; },
  decode: async () => {},
 };
 elements.set('sceneArt', art);
 const story = { image: '/scene.png', nodes: {
  start: { title: 'Start', image: '/media/start', choices: [{next:'next'}] },
  next: { title: 'Next', image: '/media/next', choices: [] },
 }, endings: {} };
 const context = vm.createContext({
  $: id => { if (!elements.has(id)) elements.set(id, {}); return elements.get(id); },
  failedArtwork: new Set(), warmedArtwork: new Set(), defaultImage: story.image,
  nodes: story.nodes, endings: story.endings, ready: false,
  current: () => story.nodes.start,
  render() { context.setArtwork(story.nodes.start); },
  fetch: async () => ({ok:true, json:async()=>({content:story})}),
  setTimeout, clearTimeout,
  Image: class { set src(value) { requested.push({src:value,priority:this.fetchPriority}); } },
 });
 vm.runInContext(helpers+'\n'+loader, context);
 return {context, art, elements, requested, story};
}

test('rendering the same artwork does not restart its image request', () => {
 const {context, art, story} = fixture();
 context.setArtwork(story.nodes.start);
 context.setArtwork(story.nodes.start);
 assert.equal(art.assignments, 1);
});

test('failed artwork uses the bundled background on subsequent renders', () => {
 const {context, art, story} = fixture();
 context.failedArtwork.add('/media/start');
 context.setArtwork(story.nodes.start);
 context.setArtwork(story.nodes.start);
 assert.equal(art.source, '/scene.png?art=storybook-ui-v2');
 assert.equal(art.assignments, 1);
});

test('an opening image failure does not block the playable story', async () => {
 const {context, art, elements} = fixture();
 art.decode = async () => { throw new Error('Image unavailable'); };
 await context.loadStory();
 assert.equal(context.ready, true);
 assert.equal(elements.get('gameStage').hidden, false);
 assert.equal(elements.get('loadingScreen').hidden, true);
 assert.equal(art.source, '/scene.png?art=storybook-ui-v2');
});

test('a failed story API request still displays the retry control', async () => {
 const {context, elements} = fixture();
 context.fetch = async () => ({ok:false});
 await context.loadStory();
 assert.equal(context.ready, false);
 assert.equal(elements.get('gameStage').hidden, true);
 assert.equal(elements.get('loadingRetry').hidden, false);
});

test('only immediate artwork is preloaded once at low priority', () => {
 const {context, requested, story} = fixture();
 context.warmNextArtwork(story.nodes.start);
 context.warmNextArtwork(story.nodes.start);
 assert.deepEqual(requested, [{src:'/media/next',priority:'low'}]);
});
