import { patternsView } from '../src/lib/views/pattern.js';

describe('patternsView', () => {
  it('que se vea el HTML', () => {
    const patternsTest = patternsView();
    expect(patternsTest instanceof HTMLElement).toBe(true);
  });
});
