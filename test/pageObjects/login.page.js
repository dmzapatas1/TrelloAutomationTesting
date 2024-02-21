
const page = require('./page')
class LoginPage {
    
    get emailInput() { 
        return $('input#user.form-field'); }
    
    get continueButton() {
         return $('input#login.button'); }

    get passwordInput() { 
        return $('input#password'); }

    get loginButton() { 
        return $('button#login-submit')
    }

    get errorPassword(){
        return $('span#password-error')
    }

    get pageHeader(){
        return $('nav#header')
    }

    get profileMenuButton(){
        return $('button[data-testid="header-member-menu-button"]')
    }
    get logoutMenuButton(){
        return $('button[data-testid="account-menu-logout"]')
    }
    get logoutConfirmButton(){
        return $('button[data-testid="logout-button"]')
    }
    openTrello () { 
        return page.trelloPage()
    }
    async login(username, password) {
        await this.emailInput.waitForDisplayed()
        await this.emailInput.setValue(username);
        await this.continueButton.click();
        await this.passwordInput.waitForDisplayed()
        await this.passwordInput.setValue(password);
        await this.loginButton.waitForDisplayed();
        await this.loginButton.click();
    }
    async logout(){ 
        await this.profileMenuButton.waitForClickable({timeout:2000})
        await this.profileMenuButton.click()
        await this.logoutMenuButton.waitForClickable({timeout:2000})
        await this.logoutMenuButton.click()
        await this.logoutConfirmButton.waitForClickable({timeout:2000})
        await this.logoutConfirmButton.click()
    }
}

module.exports = new LoginPage