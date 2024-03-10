class MemberMenu {
  get inputShare () {
    return $("input.autocomplete-input[data-testid='add-members-input']");
  }

  get acceptShareButton () {
    return $("button[data-testid='team-invite-submit-button']");
  }

  get selectMember () {
    return $('div.member-container');
  }

  get memberList () {
    return $$("div[data-testid='member-list-item-avatar']");
  }

  get closeAddMember () {
    return $("button[data-testid='board-invite-modal-close-button']");
  }

  get errorShareBoard () {
    return $('div.is-empty-text');
  }
}

module.exports = new MemberMenu();
