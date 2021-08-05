import { miscellaneousView } from '../src/lib/views/miscellaneous.js';

describe('miscellaneousView', () => {
  it('que se vea el HTML', () => {
    const miscellaneousTest = miscellaneousView();
    expect(miscellaneousTest instanceof HTMLElement).toBe(true);
  });
});
