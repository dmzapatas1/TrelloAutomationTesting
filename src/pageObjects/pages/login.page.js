const page = require('./page');
const Components = require('../components/index');
const Helpers = require('../helpers/index');
class LoginPage {
  openTrello () {
    return page.trelloPage();
  }

  pageHeader () {
    return Components.Header.pageHeader;
  }

  errorPassword () {
    return Components.Atlassian.errorPassword;
  }

  async login (username, password) {
    await Components.Login.emailInput.waitForDisplayed();
    await Components.Login.emailInput.setValue(username);
    await Components.Login.continueButton.click();
    await Components.Atlassian.passwordInput.waitForDisplayed();
    await Components.Atlassian.passwordInput.setValue(password);
    await Components.Atlassian.loginButton.waitForDisplayed();
    await Components.Atlassian.loginButton.click();
  }

  async logout () {
    await Components.Header.accountButton.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT);
    await Components.Header.accountButton.click();
    await Components.AccountMenu.logoutMenuButton.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT);
    await Components.AccountMenu.logoutMenuButton.click();
    await Components.LogoutConfirmation.logoutConfirmButton.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT);
    await Components.LogoutConfirmation.logoutConfirmButton.click();
  }
}

module.exports = new LoginPage();
