const Components = require('../components/index');
const Helpers = require('../helpers/index');
class Profile {
  profileError () {
    return Components.ProfileandVisibility.error;
  }

  async openUserProfile () {
    await Components.Header.accountButton.click();
    await Components.AccountMenu.menuProfile.waitForDisplayed();
    await Components.AccountMenu.menuProfileButton.waitForDisplayed();
    await Components.AccountMenu.menuProfileButton.click();
  }

  async editUsername (username) {
    await Components.ProfileandVisibility.inputUsername.waitForDisplayed();
    await Components.ProfileandVisibility.inputUsername.setValue(username);
    await Components.ProfileandVisibility.saveButtonForm.waitForDisplayed(Helpers.Wait.DEFAULT_TIMEOUT);
    await Components.ProfileandVisibility.saveButtonForm.click();
  }

  creatRandomUsername (username) {
    return Helpers.Utility.createRandomItem(username);
  }
}

module.exports = new Profile();
