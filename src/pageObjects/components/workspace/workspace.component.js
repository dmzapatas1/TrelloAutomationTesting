class Workspace {
  get trelloBoard() {
    return $("div.board-tile-details-name[title='My Trello board']");
  }
}

module.exports = new Workspace();
