const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail:"cf@mailinator.com",userPassword:"Password1"};
const orderPayload = {orders:[{country:"Romania",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

// let orderID;
// let token; 
let response;

test.beforeAll(async () => { 
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

// test.beforeEach( ()=>{
//     //code
// })

//tagged to run as part of @API tests
test('@API Place the order', async ({page})=>
    {   
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
        }, 
        response.token );
    await page.goto("https://rahulshettyacademy.com/client");
    
    const products = page.locator(".card-body");
   // const searchForProductName = 'ZARA COAT 3'; //item no longer needed here, done via API
      
    //orders page 
    await page.locator("button[routerlink='/dashboard/myorders']").dispatchEvent('click');
    await page.locator("tbody").waitFor(); //waiting for whole table-body to loadup, prior to making the evaluation #async breakage
    const rows = await page.locator("tbody tr"); //waiting for table data to be loaded up
    
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
}) 