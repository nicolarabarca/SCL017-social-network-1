import { feedView } from '../src/lib/views/feed.js';

describe('feedView', () => {
  it('que se vea el HTML', () => {
    const feedTest = feedView();
    expect(feedTest instanceof HTMLElement).toBe(true);
  });
});
