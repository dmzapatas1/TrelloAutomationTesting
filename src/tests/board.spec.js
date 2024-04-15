const boardPage = require('../pageObjects/pages/board.page');
const loginPage = require('../pageObjects/pages/login.page');
const helpers = require('../pageObjects/helpers/index');

describe('Board suite', () => {
  beforeEach(async () => {
    await loginPage.openTrello();
    await loginPage.login(
      'danielazapata.test@gmail.com',
      '240216Te$t'
    );
    await boardPage.openBoard();
  });
  afterEach(async () => {
    await loginPage.logout();
  });
  describe('Card and list suite', () => {
    it('Successfully creates a list', async () => {
      const newListTitle =
        helpers.Utility.createRandomItem('List test_');
      await boardPage.createNewList(newListTitle);
      await browser.waitUntil(
        async () => {
          const lastItemList = await helpers.Utility.getTextLastItem(
            boardPage.listTitles()
          );
          return lastItemList === newListTitle;
        },
        {
          timeout: 7000,
          timeoutMsg: 'The list title name does not match'
        }
      );
      const lastItemList = await helpers.Utility.getTextLastItem(
        boardPage.listTitles()
      );
      expect(lastItemList).to.equal(newListTitle);
    });
    it('Successfully creates a card', async () => {
      const newCardTitle = helpers.Utility.createRandomItem('task_');
      await boardPage.createNewCard(newCardTitle);
      await browser.waitUntil(
        async () => {
          const lastItemList = await helpers.Utility.getTextLastItem(
            boardPage.listCardsToDo()
          );
          return lastItemList === newCardTitle;
        },
        {
          timeout: 5000,
          timeoutMsg: 'The card name does not match'
        }
      );
      const lastItemList = await helpers.Utility.getTextLastItem(
        boardPage.listCardsToDo()
      );
      expect(lastItemList).to.equal(newCardTitle);
    });
    it('Should delete first card of the first list', async () => {
      const titleFirstCard = await boardPage
        .listCardsToDo()[0]
        .getText();
      await boardPage.deleteCard(0);
      await browser.waitUntil(
        async () => {
          const isTitleFirstCard = await boardPage
            .listCardsToDo()
            .some(title => title === titleFirstCard);
          return !isTitleFirstCard;
        },
        {
          timeout: 5000,
          timeoutMsg: 'The card still existing'
        }
      );
      const isTitleFirstCard = await boardPage
        .listCardsToDo()
        .some(title => title === titleFirstCard);
      expect(isTitleFirstCard).to.equal(false);
    });
  });

  describe('Share board suite', () => {
    it('Successfully shares board with another member', async () => {
      await boardPage.addMember('dmzapatas10@gmail.com');
      const titleAttributeValue = await boardPage
        .memberList()[1]
        .getAttribute('title');
      expect(titleAttributeValue).to.equal(
        'Daniela Zapata (danielazapata10)'
      );
      await boardPage.closeAddMember().click();
    });
    it('Displays error when adding a new member', async () => {
      await boardPage.errorShare('X   ');
      await boardPage.errorShareBoard().waitForDisplayed(5000);
      const errorShareBoardExists = await boardPage
        .errorShareBoard()
        .isExisting();
      expect(errorShareBoardExists).to.equal(true);
      await boardPage.closeAddMember().click();
    });
  });
});
