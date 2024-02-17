
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
}

module.exports = new LoginPage