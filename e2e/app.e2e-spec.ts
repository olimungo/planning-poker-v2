import { PlanningPokerPage } from './app.po';

describe('planning-poker App', () => {
  let page: PlanningPokerPage;

  beforeEach(() => {
    page = new PlanningPokerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
