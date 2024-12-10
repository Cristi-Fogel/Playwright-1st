const {When, Then, Given} = require('@cucumber/cucumber');
// const {POManager} = require("../../pageObjects/POManager");
const {expect} = require('playwright/test');
// const playwright =  require('playwright/test');
    
// ECOMMERCE.feature
    Given('a login to Ecommerce application with {string} and {string}',{timeout: 100*10000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(username, password);
        // const loginPage = this.poManager.getLoginPage();
        // await loginPage.goToPage();
        // // await loginPage.validLogin(data.username, data.password);
        // await loginPage.validLogin(username, password);  //data picked up from cucumber, not picked up from json file anymore
    });

    When('Add {string} to Cart', async function (productName) {
        // Write code here that turns the phrase above into concrete actions
        this.dashboardPage = this.poManager.getDashboardPage();
        await this.dashboardPage.searchProductAddCart(productName);
        await this.dashboardPage.navigateToCart();        
    });

    Then('verify that {string} is displayed in the Cart page', {timeout: 100*10000}, async function (productName) {
        // Write code here that turns the phrase above into concrete actions
        const cartPage = this.poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();
    });

    When('Enter valid details and Place the order', async function () 
    {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ro","Romania");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    });  

    Then('verify order is present in the OrderHistory page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });

// ERROR VALIDATIONS FEATURE
    Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
        const userNameInput = this.page.locator('#username');
        const signInButton = this.page.locator("#signInBtn");

        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await this.page.title());

        await userNameInput.fill(username);
        await this.page.locator("[type='password']").fill(password);
        await signInButton.click();
    });
    Then('Verify Error Message is displayed', async function () {       
        console.log(await this.page.locator("[style*='block']").textContent()); // grab text
        await expect(this.page.locator("[style*='block']")).toContainText('Incorrect'); 
    });


    
          
    

       
       
