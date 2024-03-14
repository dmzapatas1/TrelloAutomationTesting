const { When, Then } = require('@wdio/cucumber-framework');
const profilePage = require('../../pageObjects/pages/profile.page');
const Helpers = require('../../pageObjects/helpers/index');

let newUsername

  Then('the profile page', async () => {
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

Then('an error message should be displayed under the username field', async () => {  
    await profilePage
    .profileError()
    .waitForDisplayed(Helpers.Wait.DEFAULT_TIMEOUT) 
  const errorTextElement = await profilePage.profileError()
  const errorText = await errorTextElement.getText();
  expect(errorText).to.equal('Username is taken');
  })