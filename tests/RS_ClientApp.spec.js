const {test, expect} = require('@playwright/test');

test('Browser check', async ({page})=>
{
    const products = page.locator(".card-body");
    const searchForProductName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("cf@mailinator.com");
    await page.locator("#userPassword").fill("Password1");
    await page.locator("[value='Login']").click(); 

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
    //hunt for product 'Zara Coat 4' to click on it
    const countProducts = await products.count();
    for (let i=0; i< countProducts; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === searchForProductName)
        {
            //logic to add product to cart, since we've identified the one we search for
            await products.nth(i).locator("text= Add To Cart").click();
            break; //found it, no need to continue loop
        }
    }
    
    await page.locator("[routerlink*='cart'").click();
    


})