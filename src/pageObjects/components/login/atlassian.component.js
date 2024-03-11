class Atlassian {
  get passwordInput() {
    return $('input#password');
  }

  get loginButton() {
    return $('button#login-submit');
  }

  get errorPassword() {
    return $('span#password-error');
  }
}

module.exports = new Atlassian();
