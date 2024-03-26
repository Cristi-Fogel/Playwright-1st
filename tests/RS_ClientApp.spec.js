const {test, expect} = require('@playwright/test');

test('Browser check', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("cf@mailinator.com");
    await page.locator("#userPassword").fill("Password1");
    await page.locator("[value='Login']").click();

    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})