const { Given, When, Then} = require('@wdio/cucumber-framework');
const loginPage = require('../../pageObjects/pages/login.page');
const boardPage = require('../../pageObjects/pages/board.page');
const Helpers = require('../../pageObjects/helpers/index');

let newListTitle
let newCardTitle
let titleFirstCard

Given('Login on Trello Page', async () => {
    await loginPage.openTrello();
    await loginPage.login(
      'danielazapata.test@gmail.com',
      '240216Te$t'
    );
  });

Then('the board Trello page', async () => {
  await boardPage.openBoard();
  });

  When('create a new list', async () => {
    newListTitle =
    Helpers.Utility.createRandomItem('List test_');
  await boardPage.createNewList(newListTitle);
  await browser.waitUntil(
    async () => {
      const lastItemList = await Helpers.Utility.getTextLastItem(
        boardPage.listTitles()
      );
      return lastItemList === newListTitle;
    },
    {
      timeout: 10000,
      timeoutMsg: 'The list title name does not match'
    }
  );
  });
  Then('the new list its at the end of the lists', async () => {
    const lastItemList = await Helpers.Utility.getTextLastItem(
        boardPage.listTitles()
      );
      expect(lastItemList).to.equal(newListTitle);
  })

  When('create a new card in the first list', async () => {
     newCardTitle = Helpers.Utility.createRandomItem('task_');
      await boardPage.createNewCard(newCardTitle);
      await browser.waitUntil(
        async () => {
          const lastItemList = await Helpers.Utility.getTextLastItem(
            boardPage.listCardsToDo()
          );
          return lastItemList === newCardTitle;
        },
        {
          timeout: 10000,
          timeoutMsg: 'The card name does not match'
        }
      );
  });
  
  Then('the new card its at the end of the card list', async () => {
    const lastItemList = await Helpers.Utility.getTextLastItem(
        boardPage.listCardsToDo()
      );
      expect(lastItemList).to.equal(newCardTitle);
  })

  
  When('delete the first card', async () => {
    titleFirstCard = await boardPage
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
 });
 
 Then('the card deleted does not exist in the list', async () => {
    const isTitleFirstCard = await boardPage
    .listCardsToDo()
    .some(title => title === titleFirstCard);
  expect(isTitleFirstCard).to.equal(false);
 })

 When('add a new member', async () => {
    await boardPage.addMember('dmzapatas10@gmail.com');
 });
 
 Then('the new member is in the list', async () => {
    const titleAttributeValue = await boardPage
        .memberList()[1]
        .getAttribute('title');
      expect(titleAttributeValue).to.equal(
        'Daniela Zapata (danielazapata10)'
      );
      await boardPage.closeAddMember().click();
 })

 When('add new member with wrong email', async () => {
    await boardPage.errorShare('t');
 });
 
 Then('the error is display', async () => {
    await boardPage.errorShareBoard().waitForDisplayed();
      const errorShareBoardExists = await boardPage
        .errorShareBoard()
        .isExisting();
      expect(errorShareBoardExists).to.equal(true);
      await boardPage.closeAddMember().click();
 })