class List {
  get createListButton () {
    return $("button[data-testid='list-composer-button']");
  }

  get inputListName () {
    return $("textarea[name='Enter list title…']");
  }

  get addListButton () {
    return $("button[data-testid='list-composer-add-list-button']");
  }

  get listTitles () {
    return $("#board[data-testid='lists']").$$('h2');
  }
}

module.exports = new List();
