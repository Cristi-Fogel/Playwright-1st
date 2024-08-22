const { test, expect } = require("@playwright/test");
const { text } = require("stream/consumers");

test("Popup validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice")    
    // await page.goBack();
    // await page.goForward();
   
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    
    // java popup events(not web/html)
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());
    // page.on('dialog', dialog => dialog.dismiss());

    //hover elements
    await page.locator("#mousehover").hover();

    // change to iframes
    const framesPage = page.frameLocator("#courses-iframe"); 
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //this will also scroll into view the element 
    const textCheck = await framesPage.locator(".text h2").textContent(); //string is "join 13242 happy subscribers" -- so we split and grab what we need
    console.log(textCheck.split(" ")[1]); //split on whitespace
})
