const profile = require("../pageObjects/profile.page") ;
const loginPage = require("../pageObjects/login.page") ;

describe('Profile suite', () => {
    before(async()=>{
        await loginPage.openTrello()
        await loginPage.login("danielazapata.test@gmail.com", "240216Te$t")
        await profile.openUserProfile()     
    })
    it('Successfully edits profile username', async () => { 
        const username = 'danielatest_';
        const newUsername = profile.creatRandomUsername(username);
        await profile.editUsername(newUsername);
        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes(newUsername);
        }, {
            timeout: 2000,
            timeoutMsg: `The URL does not include: ${newUsername}`
        });
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include(newUsername);  
    })
    it('Fails to edit profile with duplicate username', async () => { 
        await profile.editUsername('daniela')
        const errorText = await profile.error.getText()
        expect(errorText).to.equal('Username is taken')   
    })
})