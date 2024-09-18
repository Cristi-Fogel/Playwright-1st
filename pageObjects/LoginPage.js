class LoginPage{
  
    constructor(page){
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName =  page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }
    async goToPage(){
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

    async validLogin(username, password){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click(); 
        await this.page.waitForLoadState('networkidle'); //waits until next page is loaded up
    }
}
module.exports = {LoginPage}
