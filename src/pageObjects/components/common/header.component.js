class Header {
  get accountButton() {
    return $('button[data-testid="header-member-menu-button"]');
  }

  get pageHeader() {
    return $('nav#header');
  }
}

module.exports = new Header();
