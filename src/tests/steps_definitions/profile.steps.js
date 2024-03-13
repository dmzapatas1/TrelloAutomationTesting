const { Given, When, Then, After } = require('@wdio/cucumber-framework');
const loginPage = require('../../pageObjects/pages/login.page');
const profilePage = require('../../pageObjects/pages/profile.page');
const Helpers = require('../../pageObjects/helpers/index');

let newUsername
After(async function () {
    await loginPage.logout();
});
Given('the profile page', async () => {
    await loginPage.openTrello();
    await loginPage.login(
      'danielazapata.test@gmail.com',
      '240216Te$t'
    );
    await profilePage.openUserProfile();
  });

When('enter a unique profile username {string}', async (username) => {
    newUsername = profilePage.creatRandomUsername(username);
    await profilePage.editUsername(newUsername);
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(newUsername);
      },
      {
        timeout: 5000,
        timeoutMsg: `The URL does not include: ${newUsername}`
      }
    );
});

Then('the new username appears in the url', async () => {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(newUsername);
  })

When('enter a duplicate profile username {string}', async (username) => {
    await profilePage.editUsername(username);
});

Then('an error message should be displayed', async () => {  
    await profilePage
    .profileError()
    .waitForDisplayed(Helpers.Wait) 
  const errorTextElement = await profilePage.profileError()
  const errorText = await errorTextElement.getText();
  expect(errorText).to.equal('Username is taken');
  })