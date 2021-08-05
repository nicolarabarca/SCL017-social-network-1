import { mainMenuView } from '../src/lib/views/mainMenu.js';

describe('mainMenuView', () => {
  it('que se vea el HTML', () => {
    const mainMenuTest = mainMenuView();
    expect(mainMenuTest instanceof HTMLElement).toBe(true);
  });
});
