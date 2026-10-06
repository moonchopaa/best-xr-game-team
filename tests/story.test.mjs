import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import worker, { validateStory } from '../dist/server/index.js';

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
