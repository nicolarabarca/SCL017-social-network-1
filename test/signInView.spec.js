import { signInView } from '../src/lib/views/signIn.js';

describe('signInView', () => {
  it('que se vea el HTML', () => {
    const signInTest = signInView();
    expect(signInTest instanceof HTMLElement).toBe(true);
  });
});
