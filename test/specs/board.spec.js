const board = require("../pageObjects/board.page") ;
const loginPage = require("../pageObjects/login.page") ;
const profile = require("../pageObjects/profile.page") ;
describe("Board suite", () => {
    beforeEach(async()=>{
        await loginPage.openTrello()
        await loginPage.login("danielazapata.test@gmail.com", "240216Te$t")
        await board.openBoard()
    })
    afterEach(async()=>{
       await loginPage.logout()
    })
    describe('Card and list suite', () => {
   
        it('Successfully creates a card', async () => { 
            const cardTitle = profile.creatRandomUsername('task_');
            await board.createNewCard(cardTitle);
            await browser.waitUntil(async () => {
                const lengthList = await board.listCardsToDo.length;
                const lastItemList = await board.listCardsToDo[lengthList - 1].getText();
                return lastItemList === cardTitle;
            }, {
                timeout: 3000,
                timeoutMsg: 'The card name does not match' 
            });
            const lengthList = await board.listCardsToDo.length;
            const lastItemList = await board.listCardsToDo[lengthList - 1].getText();
            expect(lastItemList).toEqual(cardTitle);    
        })
        it('Should delete first card of the first list', async () => { 
            const titleFirstCard = await board.listCardsToDo[0].getText()
            await board.deleteCard(0)
            const isTitleFirstCard = await board.listCardsToDo.some(title => title === titleFirstCard)
            expect(isTitleFirstCard).toEqual(false)
         }) 
        it('Successfully creates a list', async () => {
           const randomTitle = await profile.creatRandomUsername('List test_')
           await board.createNewList(randomTitle)
           const lengthList = await  board.listTitles.length
           const lastItemList = await board.listTitles[lengthList - 1].getText()
           expect(lastItemList).toEqual(randomTitle)
        })  
    })
    
    describe('Share board suite', () => {
        it('Successfully shares board with another member', async () => { 
            await board.addMember('dmzapatas10@gmail.com');
            expect(board.memberList[1]).toHaveAttribute('title', 'Daniela Zapata (danielazapata10)')
         })  
        it('Displays error when adding a new member', async () => {
            await board.errorShare('test')
            expect(board.errorShareBoard).toBeDisplayed()
        })     
    })
})

