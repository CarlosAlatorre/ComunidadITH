import { ComunidadITHPage } from './app.po';

describe('comunidad-ith App', function() {
  let page: ComunidadITHPage;

  beforeEach(() => {
    page = new ComunidadITHPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
