import { signUpFunction } from '../src/lib/signUp.js';

describe('signUpFunction', () => {
  it('debería ser una función', () => {
    expect(typeof signUpFunction).toBe('function');
  });
});
