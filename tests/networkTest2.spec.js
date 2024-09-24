const {test, expect} = require('@playwright/test');

test('Security test network request intercept', async ({page})=>{    
    //login and reach orders page
    const email = "cf@mailinator.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password1");
    await page.locator("[value='Login']").click(); 
    await page.locator(".card-body b").first().waitFor(); // products to loadup

    await page.locator("button[routerlink*='myorders']").click();

    //intercept the view-call
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661884053f676546b6'//this is order from another customer -- so expect to not have acess to it
        })

    )
    //once identified *all, click on View button for it
    await page.locator("button:has-text('View')").first().click();
    // await page.pause(); 

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order"); // 2x p elements in page
})