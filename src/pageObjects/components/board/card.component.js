class Card {
  get createCardButton () {
    return $("div[data-testid='list-footer'] button");
  }

  get inputCardName () {
    return $("textarea[data-testid='list-card-composer-textarea']");
  }

  get addCardButton () {
    return $("button[data-testid='list-card-composer-add-card-button']");
  }

  get listCardsToDo () {
    return $("ol[data-testid='list-cards']").$$('a');
  }

  get archiveButton () {
    return $('a.button-link.js-archive-card');
  }

  get deleteCardButton () {
    return $('a.button-link.js-delete-card.negate');
  }

  get confirmDeleteCard () {
    return $('.js-confirm.full.nch-button.nch-button--danger');
  }
}

module.exports = new Card();
