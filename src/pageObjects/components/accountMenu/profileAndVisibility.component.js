class ProfileAndVisibility {
  get inputUsername () {
    return $('input#username');
  }

  get saveButtonForm () {
    return $('form[data-testid="profile-form"] button[type="submit"]');
  }

  get error () {
    return $('#SaveProfileError_Field_username');
  }
}

module.exports = new ProfileAndVisibility();
