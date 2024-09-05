const {test, expect} = require('@playwright/test');
const { title } = require('process');

test('Blocking of network requests (.css / images)', async ({browser})=>
{ 
   const context = await browser.newContext(); 
   const page = await context.newPage();
   const userNameInput = page.locator('#username');
    const signInButton = page.locator("#signInBtn");
   
//    page.route('**/*.css{jpg,png,jpeg}', route=> route.abort()); //anything with .css will not be loaded
   page.route('**/*.{jpg,png,jpeg}', route=> route.abort()); //anything with .css will not be loaded
   
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//    await page.pause();
    await userNameInput.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    await signInButton.click();
    await page.pause();
});

test('Show all network requests made', async ({browser})=>
    { 
       const context = await browser.newContext(); 
       const page = await context.newPage();
       const userNameInput = page.locator('#username');
       const signInButton = page.locator("#signInBtn");
       
        page.on('request', request=> console.log(request.url()));
        page.on('response', response=> console.log(response.url(), response.status()))
        // page.on('request', request=> request.url());

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
         //    await page.pause();
        await userNameInput.fill("rahulshettyacademy");
        await page.locator("[type='password']").fill("learning");
        await signInButton.click();
        await page.pause();
    });