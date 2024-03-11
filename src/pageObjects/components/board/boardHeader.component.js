class BoardHeader {
  get shareButton() {
    return $("button[data-testid='board-share-button']");
  }
}

module.exports = new BoardHeader();
