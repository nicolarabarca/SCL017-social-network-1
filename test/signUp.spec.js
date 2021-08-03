import { signUpView } from '../src/lib/views/signUp.js';

describe('signUpView', () => {
  it('debería ser una función', () => {
    expect(typeof signUpView).toBe('function');
  });
});
