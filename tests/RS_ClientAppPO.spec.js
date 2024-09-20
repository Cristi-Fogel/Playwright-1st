const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager.js');

test('Browser check', async ({page})=>
{
    const poManager = new POManager(page);
    const productName = 'ZARA COAT 3';
    const username = "cf@mailinator.com";
    const password = "Password1";
    
    const loginPage = poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(username, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    
    //goto cart
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
    // await page.pause();

    //checkout page
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ro","Romania");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


}) 