class Profile {
    get profileButton() { 
        return $("button[data-testid='header-member-menu-button']")
    }
    get menuProfile() { 
        return $("div[data-testid='account-menu']")
    }
    get menuProfileButton() { 
        return $("a[data-testid='account-menu-profile']")
    }
    get inputUsername(){
        return $("input#username")
    }
    get saveButton(){
        return $("button[type='submit']")
    }
    get form(){
        return $('form[data-testid="profile-form"] button[type="submit"]')
    }
    get error(){
        return $('#SaveProfileError_Field_username')
    }
    async openUserProfile(){
       await this.profileButton.click()
       await this.menuProfile.waitForDisplayed()
       await this.menuProfileButton.waitForDisplayed()
       await this.menuProfileButton.click()
    }
    async editUsername(username){
       await this.inputUsername.waitForDisplayed()
       await this.inputUsername.setValue(username) 
       await this.form.click()
    }
    creatRandomUsername(username){
        const randomNumber = Math.floor(Math.random() * 900) + 100
        const newUsername= username + randomNumber
        return newUsername
    }
}

module.exports = new Profile