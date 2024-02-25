const Components = require('../components/index')
const Helpers = require('../helpers/index')
class Board {
    listCardsToDo(){
        return Components.Card.listCardsToDo
    }
    listTitles(){
        return Components.List.listTitles
    }
    memberList(){
        return Components.MemberMenu.memberList
    }
    closeAddMember(){
        return Components.MemberMenu.closeAddMember
    }
    errorShareBoard(){
        return Components.MemberMenu.errorShareBoard
    }
    async openBoard(){
        await Components.Workspace.trelloBoard.waitForExist();
        await Components.Workspace.trelloBoard.click();
    }
    async createNewCard(title){   
        await Components.Card.createCardButton.click()
        await Components.Card.inputCardName.waitForClickable();
        await Components.Card.inputCardName.click();
        await Components.Card.inputCardName.setValue(title);
        await Components.Card.addCardButton.waitForClickable();
        await Components.Card.addCardButton.click();      
    }
    async deleteCard(position){
        await Components.Card.listCardsToDo[position].click()
        await Components.Card.archiveButton.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT)
        await Components.Card.archiveButton.click()
        await Components.Card.deleteCardButton.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT)
        await Components.Card.deleteCardButton.click()
        await Components.Card.confirmDeleteCard.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT)
        await Components.Card.confirmDeleteCard.click()
    }
    async createNewList(title){
        await Components.List.createListButton.waitForClickable()
        await Components.List.createListButton.click()
        await Components.List.inputListName.setValue(title);
        await Components.List.addListButton.waitForClickable(Helpers.Wait.DEFAULT_TIMEOUT);
        await Components.List.addListButton.click();      
    }
    async addMember(email){
        await Components.BoardHeader.shareButton.waitForClickable()
        await Components.BoardHeader.shareButton.click()
        await Components.MemberMenu.inputShare.waitForDisplayed()
        await Components.MemberMenu.inputShare.click()
        await Components.MemberMenu.inputShare.setValue(email)
        await Components.MemberMenu.selectMember.click()
        await Components.MemberMenu.acceptShareButton.waitForClickable() 
        await Components.MemberMenu.acceptShareButton.click()   
    }
    async errorShare(email){
        await Components.BoardHeader.shareButton.waitForClickable()
        await Components.BoardHeader.shareButton.click()
        await Components.MemberMenu.inputShare.waitForDisplayed()
        await Components.MemberMenu.inputShare.click()
        await Components.MemberMenu.inputShare.setValue(email)
    }
}

module.exports = new Board