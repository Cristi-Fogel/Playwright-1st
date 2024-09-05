const {test, expect} = require('@playwright/test');
const { title } = require('process');

test('First test ever', async ({browser})=>
{
   const context = await browser.newContext(); 
   const page = await context.newPage();
    
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page.pause();
});
 

test('Browser Input Error Message test', async ({page})=>
{ 
    const userNameInput = page.locator('#username');
    const signInButton = page.locator("#signInBtn");
    //products page
    const productCardTitles = page.locator(".card-body a");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await userNameInput.fill("rahulshe");
   await page.locator("[type='password']").fill("learning");
   await signInButton.click();
        //no explicit wait needed like selenium (takes one from config 30s) 
    console.log(await page.locator("[style*='block']").textContent()); // grab text
    await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //no need to have all text, just one word in this case
    await userNameInput.fill("");
    await userNameInput.fill("rahulshettyacademy");
    await signInButton.click();
    // wait until all page content is loaded
    await page.waitForLoadState('networkidle');
        //array of 4 products
    console.log(await productCardTitles.nth(0).textContent());
    console.log(await productCardTitles.nth(3).textContent());
    console.log(await productCardTitles.first().textContent());   
    console.log(await productCardTitles.last().textContent());   
    const allTitles = await productCardTitles.allTextContents();  //will return an array, can be blank --- so might want an additional check in place
    console.log(allTitles);
       
});

test('Browser Check List test', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("cf@mailinator.com");
    await page.locator("#userPassword").fill("Password1");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
       // //if networkidle fails, 
    
    const titles = await page.locator(".card-body b").allTextContents(); //if this cails, can add first as well
    console.log(titles);
});

//radiobuttons + dropdowns 
test("UI Controls test", async ({page})=>
{
    const userNameInput = page.locator('#username');
    const signInButton = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userNameInput.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
        //fixed, static dropdown
    const dropdown = page.locator("select.form-control"); //define dropdown
    await dropdown.selectOption("consult"); //select desired option
    
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    //confirm selection
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    console.log(page.locator(".radiotextsty").nth(1).isChecked()); //fails if not checked 

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //uncheck therms and assert it to be empty (no direct toBeChecked() method)
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();  //if action is done on this level, shift inside
    // check blinking item on page
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); // if class element is found, then blinking will eventually work

    //await page.pause();
    await signInButton.click();
});

test('Child windows handling', async ({browser})=>
{    
    //we define context and start from browser level, not page
    const context = await browser.newContext(); 
    const page = await context.newPage(); 
    const documentLink = page.locator("[href*='documents-request']");
    //normal test flow
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    //2nd tab 
    const [newPage]= await Promise.all(
    // const [newPage, newPage2] /// if there are multiple tabs in play
    [
        context.waitForEvent('page'),  //define page and start the event listener so it's ready for whwen you click to open the page
        documentLink.click(),  //page open in another tab, so we check it there   
    ]);
    
    const redText = await newPage.locator(".red").textContent();
    console.log(redText);

    const arrayText = redText.split("@"); //split on at
    const domainText = arrayText[1].split(" ")[0] //split on whitespace
    console.log(domainText);

    //go back to main page
    await page.locator("#username").fill(domainText);
   
   // await page.pause();
    console.log(await page.locator("#username").textContent()); //prints content in element to logs
});
