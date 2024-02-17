
const profile = require("../pageObjects/profile.page") ;
const loginPage = require("../pageObjects/login.page") ;

describe('Profile suite', () => {
    before(async()=>{
        await loginPage.openTrello()
        await loginPage.login("danielazapata.test@gmail.com", "240216Te$t")
        await profile.openUserProfile()     
    })
    it('Successfully edits profile username', async () => { 
        const username = 'danielatest_'
        const newUsername = profile.creatRandomUsername(username)
        await profile.editUsername(newUsername) 
        const currentUrl = await browser.getUrl();
        expect(await currentUrl).toHaveUrlContaining(newUsername)       
    })
    it('Fails to edit profile with duplicate username', async () => { 
        await profile.editUsername('daniela')
        expect(profile.error).toHaveText('Username is taken')   
    })
})