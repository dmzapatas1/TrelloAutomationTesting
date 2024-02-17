const board = require("../pageObjects/board.page") ;
const loginPage = require("../pageObjects/login.page") ;
const profile = require("../pageObjects/profile.page") ;

describe('Board suite', () => {
    before(async()=>{
        await loginPage.openTrello()
        await loginPage.login("danielazapata.test@gmail.com", "240216Te$t")
        await board.openBoard()
    })
    it('Successfully creates a card', async () => { 
        const cardTitle = profile.creatRandomUsername('task_');
        await board.createNewCard(cardTitle);
        await browser.waitUntil(async () => {
            const lengthList = await board.listCardsToDo.length;
            const lastItemList = await board.listCardsToDo[lengthList - 1].getText();
            return lastItemList === cardTitle;
        }, {
            timeout: 1000,
            timeoutMsg: 'The card name does not match' 
        });
        const lengthList = await board.listCardsToDo.length;
        const lastItemList = await board.listCardsToDo[lengthList - 1].getText();
        expect(lastItemList).toEqual(cardTitle);    
    })
    it('Successfully creates a list', async () => {
       const randomTitle = await profile.creatRandomUsername('List test_')
       await board.createNewList(randomTitle)
       const lengthList = await  board.listTitles.length
       const lastItemList = await board.listTitles[lengthList - 1].getText()
       expect(lastItemList).toEqual(randomTitle)
    })  
    it('Successfully shares board with another member', async () => { 
        await board.addMember('dmzapatas10@gmail.com');
        expect(await board.memberList[1]).toHaveAttribute('title', 'Daniela Zapata (danielazapata10)')
     })  
    it('Displays error when adding a new member', async () => {
        await board.errorShare('test')
        expect(await board.errorShareBoard).toBeDisplayed()
    }) 
})