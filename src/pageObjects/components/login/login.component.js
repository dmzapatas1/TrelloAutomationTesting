class Login {
  get emailInput() {
    return $('input#user.form-field');
  };

  get emailInput2(){
    return $('input#username');
  };

  get continueButton() {
    return $('input#login.button');
  };

  get continueButton2() {
    return $('button#login-submit');
  }
}

module.exports = new Login();
