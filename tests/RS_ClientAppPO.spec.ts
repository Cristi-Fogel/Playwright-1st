///////////////////////////////////  JS
// const {test, expect} = require();
// const {customTest} = require('../utils/test-base.js')
// const {POManager} = require('../pageObjects/POManager.js');
///////////////////////////////////  TS
import { test, expect } from '@playwright/test';
import { customTest } from '../utils_ts/test-base';
import { POManager } from '../pageObjects_ts/POManager.js';

//json->string->jsObject (to avoid fileFormat issues)
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json"))); //parse to JS object

//iterate through array
for (const data of dataset){
    test(`Client app login ${data.productName}`, async ({page})=>
    {
        const poManager = new POManager(page);
        // const productName = 'ZARA COAT 3';
        // const username = "cf@mailinator.com";
        // const password = "Password1";
        
        const loginPage = poManager.getLoginPage();
        await loginPage.goToPage();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        
        //goto cart
        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();
        // await page.pause();

        //checkout page
        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ro","Romania");
        let orderId: any; //defined here, so can be used in test
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}

//customizing test behaviour wih fixtures
customTest(`@Web Client app login`, async ({page, testDataForOrder})=>
    {
        const poManager = new POManager(page); 
        
        const loginPage = poManager.getLoginPage();
        await loginPage.goToPage();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
    });
