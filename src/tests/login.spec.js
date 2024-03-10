const loginPage = require('../pageObjects/pages/login.page');
const Helpers = require('../pageObjects/helpers/index');

describe('Login', () => {
  beforeEach(async () => {
    await loginPage.openTrello();
  });
  it('Login with invalid password', async () => {
    await loginPage.login('daniela_zapata@epam.com', '');
    const errorText = await loginPage.errorPassword().getText();
    expect(errorText).to.equal('Enter your password');
  });
  it('Successfully login with valid credentials', async () => {
    await loginPage.login('danielazapata.test@gmail.com', '240216Te$t');
    await browser.waitUntil(async () => {
      await loginPage.pageHeader().waitForExist(Helpers.Wait.DEFAULT_TIMEOUT);
      return await loginPage.pageHeader().isExisting();
    }, { timeout: 5000, timeoutMsg: 'Page header did not exist' });
    const headerIsExisting = await loginPage.pageHeader().isExisting();
    expect(headerIsExisting).to.equal(true);
  });
});
