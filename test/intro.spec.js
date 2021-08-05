import { introView } from '../src/lib/views/intro.js';

describe('introView', () => {
  it('que se vea el HTML', () => {
    const introTest = introView();
    expect(introTest instanceof HTMLElement).toBe(true);
  });
});
