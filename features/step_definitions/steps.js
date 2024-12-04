const {When, Then, Given} = require('@cucumber/cucumber');
const {POManager} = require("../../pageObjects/POManager");
const {expect} = require('playwright/test');
const playwright =  require('playwright/test');

        //any method that takes more than 5 seconds, need a timeout
    Given('a login to Ecommerce application with {string} and {string}',{timeout: 100*10000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
        const browser = await playwright.chromium.launch({
            headless: false
        });
        
        const context = await browser.newContext();
        const page = await context.newPage();    
        this.poManager = new POManager(page); // this. will make sure it's accessible outside this block (avoid null-pointer exception)
        const loginPage = this.poManager.getLoginPage();
        await loginPage.goToPage();
        // await loginPage.validLogin(data.username, data.password);
        await loginPage.validLogin(username, password);  //data picked up from cucumber, not picked up from json file anymore
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