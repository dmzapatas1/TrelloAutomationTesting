class Board {
    get trelloBoard(){
        return $("div.board-tile-details-name[title='My Trello board']")
    }
    get createCardButton(){
        return $("div[data-testid='list-footer'] button")
    }
    get inputCardName(){
        return $("textarea[data-testid='list-card-composer-textarea']")
    }
    get addCardButton(){
        return $("button[data-testid='list-card-composer-add-card-button']")
    }

    get createListButton(){
        return $("button[data-testid='list-composer-button']")
    }

    get inputListName(){
        return $("textarea[name='Enter list title…']")
    }

    get addListButton(){
        return $("button[data-testid='list-composer-add-list-button']")
    }
  
    get shareButton(){
        return $("button[data-testid='board-share-button']")
    }

    get inputShare(){
        return $("input.autocomplete-input[data-testid='add-members-input']")
    }

    get acceptShareButton(){
        return $("button[data-testid='team-invite-submit-button']")
    }

    get selectMember(){
        return $('div.member-container')
    }

    get memberList(){
        return $$("div[data-testid='member-list-item-avatar']")
    }

    get closeAddMember(){
        return $("button[data-testid='board-invite-modal-close-button']")
    }

    get errorShareBoard(){
        return $('div.is-empty-text')
    }

    get listTitles(){
        return $("#board[data-testid='lists']").$$("h2")
    }
    get listCardsToDo(){
        return $("ol[data-testid='list-cards']").$$("a")
    }
    get archiveButton(){
        return $('a.button-link.js-archive-card')
    }
    get deleteCardButton(){
        return $('a.button-link.js-delete-card.negate')
    }
    get confirmDeleteCard(){
        return $('.js-confirm.full.nch-button.nch-button--danger')
    }
    async openBoard(){
        await this.trelloBoard.waitForExist();
        await this.trelloBoard.click();
    }
    async createNewCard(title){    
        await this.createCardButton.click()
        await this.inputCardName.waitForClickable();
        await this.inputCardName.click();
        await this.inputCardName.setValue(title);
        await this.addCardButton.waitForClickable();
        await this.addCardButton.click();      
    }
    async deleteCard(position){
        await this.listCardsToDo[position].click()
        await this.archiveButton.waitForClickable({timeout:2000})
        await this.archiveButton.click()
        await this.deleteCardButton.waitForClickable({timeout:2000})
        await this.deleteCardButton.click()
        await this.confirmDeleteCard.waitForClickable({timeout:2000})
        await this.confirmDeleteCard.click()
        await browser.pause(3000)
    }
    async createNewList(title){
        await this.createListButton.click()
        await this.inputListName.setValue(title);
        await this.addListButton.waitForClickable({timeout:2000});
        await this.addListButton.click();      
    }

    async addMember(email){
        await this.shareButton.waitForClickable()
        await this.shareButton.click()
        await this.inputShare.waitForDisplayed()
        await this.inputShare.click()
        await this.inputShare.setValue(email)
        await this.selectMember.click()
        await this.acceptShareButton.waitForClickable() 
        await this.acceptShareButton.click()   
        await this.closeAddMember.click()
    }

    async errorShare(email){
        await this.shareButton.waitForClickable()
        await this.shareButton.click()
        await this.inputShare.waitForDisplayed()
        await this.inputShare.click()
        await this.inputShare.setValue(email)
        await this.closeAddMember.click()
    }
}

module.exports = new Board