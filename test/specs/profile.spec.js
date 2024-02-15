
const profile = require("../pageObjects/profile.page") ;
const loginPage = require("../pageObjects/login.page") ;

describe('Profile', () => {
    beforeEach(async()=>{
        await loginPage.openTrello()
    })
    it('Success edit profile', async () => {
        await loginPage.login("danielazapata.test@gmail.com", "240216Te$t")
        await profile.editUsername('daniela23123')
        const currentUrl = browser.getUrl()
        expect(await currentUrl).toContain('daniela23123')     
    })
   
})