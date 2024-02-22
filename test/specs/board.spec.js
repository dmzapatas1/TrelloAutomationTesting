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
                timeout:5000,
                timeoutMsg: 'The card name does not match' 
            });
            const lengthList = await board.listCardsToDo.length;
            const lastItemList = await board.listCardsToDo[lengthList - 1].getText();
            expect(lastItemList).to.equal(cardTitle); 
        })
        it('Should delete first card of the first list', async () => { 
            const titleFirstCard = await board.listCardsToDo[0].getText()
            await board.deleteCard(0)
            await browser.waitUntil(async () => {
                const isTitleFirstCard = await board.listCardsToDo.some(title => title === titleFirstCard);
                return !isTitleFirstCard;
            }, {
                timeout: 5000,
                timeoutMsg: 'The card still existing'
            });
            const isTitleFirstCard = await board.listCardsToDo.some(title => title === titleFirstCard)
            expect(isTitleFirstCard).to.equal(false)
         }) 
        it('Successfully creates a list', async () => {
           const randomTitle = await profile.creatRandomUsername('List test_')
           await board.createNewList(randomTitle)
           const lengthList = await  board.listTitles.length
           const lastItemList = await board.listTitles[lengthList - 1].getText()
           expect(lastItemList).to.equal(randomTitle)
        })  
    })
    
    describe('Share board suite', () => {
        it('Successfully shares board with another member', async () => { 
            await board.addMember('dmzapatas10@gmail.com');
            const titleAttributeValue = await board.memberList[1].getAttribute('title');
            expect(titleAttributeValue).to.equal('Daniela Zapata (danielazapata10)')
            await board.closeAddMember.click()
         })  
        it('Displays error when adding a new member', async () => {
            await board.errorShare('t') 
            await board.errorShareBoard.waitForDisplayed()
            expect(await board.errorShareBoard.isExisting()).to.be.true
            await board.closeAddMember.click()
        })     
    })
})

