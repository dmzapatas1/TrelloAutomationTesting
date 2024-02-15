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
    async editUsername(username){
       await this.profileButton.click()
       await this.menuProfile.waitForDisplayed()
       await this.menuProfileButton.waitForDisplayed()
       await this.menuProfileButton.click()
       await this.inputUsername.waitForDisplayed()
       await this.inputUsername.setValue(username)
       await this.saveButton.click()   
    }
}

module.exports = new Profile