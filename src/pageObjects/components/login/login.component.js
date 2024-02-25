class Login{
    get emailInput() { 
        return $('input#user.form-field'); 
    } 
    get continueButton() {
         return $('input#login.button'); 
        }
}

module.exports = new Login