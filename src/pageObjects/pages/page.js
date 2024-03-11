class Page {
  async trelloPage() {
    await browser.url('https://trello.com/login');
  }
}

module.exports = new Page();
