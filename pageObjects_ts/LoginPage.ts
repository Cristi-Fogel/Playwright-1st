import {test, expect, Locator, Page} from '@playwright/test';  // TS import

export class LoginPage{

    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;

    constructor(page: Page){
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName =  page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }
    async goToPage(){
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

    async validLogin(username: string, password: string){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click(); 
        await this.page.waitForLoadState('networkidle'); //waits until next page is loaded up
    }
}
module.exports = {LoginPage}
