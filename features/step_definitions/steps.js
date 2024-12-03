const {When, Then, Given} = require('@cucumber/cucumber');
const {POManager} = require("../../pageObjects/POManager");
const {test, expect, playwright} = require('playwright/test')
    
    Given('a login to Ecommerce application with {username} and {password}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
        const browser = playwright.chromium.launch();
        
        const context = await browser.newContext();
        const page = await context.newPage();    
        this.poManager = new POManager(page); // this. will make sure it's accessible outside this block (avoid null-pointer exception)
        const loginPage = poManager.getLoginPage();
        await loginPage.goToPage();
        await loginPage.validLogin(data.username, data.password);

    });

    When('Add {string} to Cart', async function (string) {
        // Write code here that turns the phrase above into concrete actions
        const dashboardPage = this.poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        
    });
    Then('verify that {string} is displayed in the Cart page', async function (string) {
        // Write code here that turns the phrase above into concrete actions
        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();
        });

    When('Enter valid details and Place the order', async function () 
    {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ro","Romania");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    });    

    Then('verify order is present in the OrderHistory page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });