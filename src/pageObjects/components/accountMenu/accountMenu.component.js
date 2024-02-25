class AccountMenu{
    get menuProfile() { 
        return $("div[data-testid='account-menu']")
    }
    get menuProfileButton() { 
        return $("a[data-testid='account-menu-profile']")
    }
    get logoutMenuButton(){
        return $('button[data-testid="account-menu-logout"]')
     }
}

module.exports = new AccountMenu