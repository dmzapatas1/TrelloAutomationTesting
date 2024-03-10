class LogoutConfirmation {
  get logoutConfirmButton () {
    return $('button[data-testid="logout-button"]');
  }
}

module.exports = new LogoutConfirmation();
