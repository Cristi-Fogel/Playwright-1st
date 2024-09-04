const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');

const loginPayload = {userEmail:"cf@mailinator.com",userPassword:"Password1"};
const orderPayload = {orders:[{country:"Romania",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

let response;
let fakePayloadOrders = {data: [], message:"No Orders"};

test.beforeAll(async () => { 
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('@API Place the order', async ({page})=>
    {   
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
        }, 
        response.token );
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    
    //mock the orders call --reroute how we want it
    // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/65fd2ecda86f8f74dca8070b", //with explicit id of customer (wildcard for wokring with any)
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route=>{
            //response interception -> [i am here] API response->browser->render data
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    );
    // await page.pause();
    //orders page 
    await page.locator("button[routerlink='/dashboard/myorders']").dispatchEvent('click');
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    
    
    
   
}) 