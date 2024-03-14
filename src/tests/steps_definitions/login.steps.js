const { Given, When, Then } = require('@wdio/cucumber-framework');
const loginPage = require('../../pageObjects/pages/login.page');
const Helpers = require('../../pageObjects/helpers/index');

Given('Open the Trello login page', async () => {
  await loginPage.openTrello();
});
Then('logout from trello', async () => {
  await loginPage.logout();
  });

When('enter a valid email {string} and an invalid pass {string}', async (username, password) => {
  await loginPage.login(username, password);
});

Then('an error message should be displayed under the password field', async () => {
  await loginPage.errorPassword()
  .waitForDisplayed(Helpers.Wait.DEFAULT_TIMEOUT) 
  const errorTextElement = await loginPage.errorPassword()
  const errorText = await errorTextElement.getText();
  expect(errorText).to.equal('Enter your password');
})

When('enter a valid email {string} and a valid pass {string}', async (username, password) => {
  await loginPage.login(username, password);
  await browser.waitUntil(
    async () => {
      await loginPage
        .pageHeader()
        .waitForExist(Helpers.Wait.DEFAULT_TIMEOUT);
      return await loginPage.pageHeader().isExisting();
    },
    { timeout: 3000, timeoutMsg: 'Page header did not exist' }
  );
});

Then('should be successfully logged in', async () => {
  const headerIsExisting = await loginPage.pageHeader().isExisting();
  expect(headerIsExisting).to.equal(true);
});