const profilePage = require('../pageObjects/pages/profile.page');
const loginPage = require('../pageObjects/pages/login.page');

describe('Profile suite', () => {
  before(async () => {
    await loginPage.openTrello();
    await loginPage.login(
      'danielazapata.test@gmail.com',
      '240216Te$t'
    );
    await profilePage.openUserProfile();
  });
  it('Successfully edits profile username', async () => {
    const username = 'danielatest_';
    const newUsername = profilePage.creatRandomUsername(username);
    await profilePage.editUsername(newUsername);
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(newUsername);
      },
      {
        timeout: 2000,
        timeoutMsg: `The URL does not include: ${newUsername}`
      }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(newUsername);
  });
  // fail in edge headless
  it('Fails to edit profile with duplicate username', async () => {
    await profilePage.editUsername('daniela');
    await profilePage
      .profileError()
      .waitForDisplayed({ timeout: 5000 });
    const errorText = await profilePage.profileError().getText();
    expect(errorText).to.equal('Username is taken');
  });
});
