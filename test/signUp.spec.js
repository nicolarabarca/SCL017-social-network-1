import { signUpView } from '../src/lib/views/signUp.js';

describe('signUpView', () => {
  it('que se vea el HTML', () => {
    const signUpTest = signUpView();
    expect(signUpTest instanceof HTMLElement).toBe(true);
  });
});
