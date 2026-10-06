import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import worker, { validateStory, audioType } from '../dist/server/index.js';

const defaults = JSON.parse(await readFile(new URL('../server/default-story.json', import.meta.url)));
const draft = () => structuredClone(defaults);

// Exercise the actual resolver without starting the browser UI.
const gameSource = await readFile(new URL('../public/game.js', import.meta.url), 'utf8');
const resolver = gameSource.slice(gameSource.indexOf('function current()'), gameSource.indexOf('function choose('));
function endingFor(bag) {
  return vm.runInNewContext(`${resolver}\ncurrent()`, {
    state: { node: 'ending', bag }, nodes: defaults.nodes, endings: defaults.endings,
  });
}

test('default story validates without mutating source content', () => {
  const input = draft(), before = structuredClone(input);
  const clean = validateStory(input);
  assert.deepEqual(input, before);
  assert.equal(Object.keys(clean.nodes).length, Object.keys(input.nodes).length);
  assert.deepEqual(clean.endings, input.endings);
});

test('legacy recovery and energy are stripped without changing destinations', () => {
  const input = draft();
  input.nodes.recovery = { choices: [{ next: '@resume', energy: 70 }] };
  input.nodes.start.choices[0].energy = -10;
  input.sceneOrder.unshift('nodes:recovery');
  const clean = validateStory(input);
  assert.equal(clean.nodes.recovery, undefined);
  assert.equal(clean.nodes.start.choices[0].energy, undefined);
  assert.equal(clean.nodes.start.choices[0].next, defaults.nodes.start.choices[0].next);
  assert.ok(!clean.sceneOrder.includes('nodes:recovery'));
  assert.equal(input.nodes.start.choices[0].energy, -10);
});

test('saved legacy stories are normalized when read through the API', async () => {
  const input = draft();
  input.nodes.recovery = { choices: [{ next: '@resume', energy: 70 }] };
  input.nodes.start.choices[0].energy = -10;
  const env = { DB: { prepare: () => ({ first: async () => ({
    revision: 7, content: JSON.stringify(input), updated_at: '2026-01-01T00:00:00Z',
  }) }) } };
  const response = await worker.fetch(new Request('https://example.test/api/story'), env);
  assert.equal(response.status, 200);
  const saved = await response.json();
  assert.equal(saved.revision, 7);
  assert.equal(saved.content.nodes.recovery, undefined);
  assert.equal(saved.content.nodes.start.choices[0].energy, undefined);
});

test('existing saved stories may still use legacy bundled artwork', () => {
  for (const image of ['/place-cafe.jpg', '/recovery.png', '/scene.png']) {
    const input = draft();
    input.nodes.start.image = image;
    assert.equal(validateStory(input).nodes.start.image, image);
  }
});

test('missing and retired destinations are rejected', () => {
  for (const next of ['missing', '@resume', 'recovery']) {
    const input = draft();
    input.nodes.start.choices[0].next = next;
    assert.throws(() => validateStory(input), /existing destination/);
  }
});

test('a reachable cycle without an ending is rejected', () => {
  const input = draft();
  input.nodes.start.choices = [{ text: 'Loop', next: 'start' }];
  assert.throws(() => validateStory(input), /no route to an ending/);
});

test('image-only scenes retain one Next destination and no energy field', () => {
  const input = draft();
  input.nodes.start.type = 'image';
  input.nodes.start.line = '';
  input.nodes.start.choices = [{ text: 'Continue', next: 'ending', energy: 0 }];
  assert.deepEqual(validateStory(input).nodes.start.choices, [{ text: 'Next', next: 'ending' }]);
  input.nodes.start.choices.push({ text: 'Extra', next: 'ending' });
  assert.throws(() => validateStory(input), /one Next destination/);
});

test('dialogue scenes still allow at most three choices', () => {
  const input = draft();
  input.nodes.tea.choices = Array.from({ length: 4 }, () => ({ text: 'Finish', next: 'ending' }));
  assert.throws(() => validateStory(input), /1–3 choices/);
});

test('all sixteen ingredient combinations preserve the four recipe outcomes', () => {
  const ingredients = ['boba', 'tea', 'milk', 'maple'];
  for (let mask = 0; mask < 16; mask++) {
    const bag = ingredients.filter((_, index) => mask & (1 << index));
    const expected = mask === 14
      ? defaults.nodes.scene_9634fffd222c4e74958ef0732ebb5450
      : mask === 15 ? defaults.endings.classic
      : mask === 7 ? defaults.endings.maple : defaults.endings.clear;
    assert.equal(endingFor(bag).title, expected.title, `ingredients: ${bag}`);
  }
});

test('scene voice clips survive validation and reject anything else', () => {
  const input = draft();
  input.nodes.start.voice = '/voice/3280224d-bc84-4b51-889c-880c994f0240';
  assert.equal(validateStory(input).nodes.start.voice, input.nodes.start.voice);

  for (const bad of ['/media/3280224d-bc84-4b51-889c-880c994f0240', '/voice/../secret', 'https://example.test/clip.mp3']) {
    const broken = draft();
    broken.nodes.start.voice = bad;
    assert.throws(() => validateStory(broken), /Invalid voice clip/);
  }
});

test('endings and image-only scenes may also carry a voice clip', () => {
  const clip = '/voice/3280224d-bc84-4b51-889c-880c994f0240';
  const input = draft();
  input.endings.clear.voice = clip;
  input.nodes.library.voice = clip;
  const clean = validateStory(input);
  assert.equal(clean.endings.clear.voice, clip);
  assert.equal(clean.nodes.library.type, 'image');
  assert.equal(clean.nodes.library.voice, clip);
});

test('uploaded audio is recognised by its header, not its file name', () => {
  const header = bytes => audioType(new Uint8Array([...bytes, ...Array(12).fill(0)]));
  assert.equal(header([0x49, 0x44, 0x33]), 'audio/mpeg');
  assert.equal(header([0xff, 0xfb]), 'audio/mpeg');
  assert.equal(header([...'RIFF'].map(c => c.charCodeAt(0)).concat([0, 0, 0, 0], [...'WAVE'].map(c => c.charCodeAt(0)))), 'audio/wav');
  assert.equal(header([0, 0, 0, 0, ...[...'ftyp'].map(c => c.charCodeAt(0))]), 'audio/mp4');
  assert.equal(header([...'OggS'].map(c => c.charCodeAt(0))), 'audio/ogg');
  assert.equal(header([0x1a, 0x45, 0xdf, 0xa3]), 'audio/webm');
  // A JPEG also starts with 0xff, so it must not be mistaken for an MP3 frame.
  assert.equal(header([0xff, 0xd8, 0xff]), null);
});

test('the original story stays available after the saved story is replaced', async () => {
  const wrecked = draft();
  wrecked.nodes.start.title = 'Replaced';
  const env = { DB: { prepare: () => ({ first: async () => ({
    revision: 4, content: JSON.stringify(wrecked), updated_at: '2026-01-01T00:00:00Z',
  }) }) } };

  const saved = await (await worker.fetch(new Request('https://example.test/api/story'), env)).json();
  assert.equal(saved.content.nodes.start.title, 'Replaced');

  const original = await worker.fetch(new Request('https://example.test/api/story/original'), env);
  assert.equal(original.status, 200);
  const body = await original.json();
  assert.equal(body.content.nodes.start.title, defaults.nodes.start.title);
  // It is a restore source, not a save: it carries no revision to save against.
  assert.equal(body.revision, undefined);
});
