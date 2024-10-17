const { test, expect } = require("@playwright/test");
const { text } = require("stream/consumers");

// test.describe.configure({mode: 'parallel'}); //with this, the tests will run all at once instead of one after the other
// test.describe.configure({mode: 'serial'}); //with this, run them one after other; test dependencies (if a test fails, rest will get skipped)

test("@Web Popup validations", async({page})=>
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
});

test("Screenshot and UI validation", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice")
    await expect(page.locator("#displayed-text")).toBeVisible();
    
    await page.locator('#displayed-text').screenshot({path: 'screenshots/partialScreenshot.png'})
    await page.locator("#hide-textbox").click();
    
    await page.screenshot({path: 'screenshots/screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screenshot -> store -> compare with screenshot from previous day
test('visual comparission', async({page})=>
{
    await page.goto("https://www.google.com");
    expect(await page.screenshot()).toMatchSnapshot('screnshots/landing.png');  //1st run will fail, BUT it creates a screenshot so you have for future runs!

});