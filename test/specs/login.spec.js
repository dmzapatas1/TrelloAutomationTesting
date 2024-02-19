const loginPage = require("../pageObjects/login.page") ;

describe('Login', () => {
    beforeEach(async()=>{
        await loginPage.openTrello()
    })
    it('Login with invalid password', async () => {
        await loginPage.login("daniela_zapata@epam.com", "")
       expect (loginPage.errorPassword).toHaveText('Enter your password')
    })
    it('Successfully login with valid credentials', async () => {
        await loginPage.login("danielazapata.test@gmail.com", "240216Te$t")
        expect (loginPage.pageHeader).toExist()
    })
})