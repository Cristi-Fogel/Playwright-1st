const {test, expect} = require('@playwright/test');

test('Browser check', async ({page})=>
{
    const products = page.locator(".card-body");
    const searchForProductName = 'ZARA COAT 3';
    const email = "cf@mailinator.com";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password1");
    await page.locator("[value='Login']").click(); 
    await page.locator(".card-body b").first().waitFor(); // products to loadup

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
    // await page.pause();
    //hunt for product 'Zara Coat 4' to click on it
    const countProducts = await products.count();
    for (let i=0; i < countProducts; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === searchForProductName)
        {
            //logic to add product to cart, since we've identified the one we search for
            await products.nth(i).locator("text= Add To Cart").click();  
            break; //found it, no need to continue loop
        }
    }
    // await page.pause();
    //goto cart
    await page.waitForLoadState('networkidle') 
    await page.locator("button[routerlink='/dashboard/cart']").dispatchEvent('click');
    await page.locator("div li").first().waitFor(); //wait until 1st item of list of items show up (1st item in list is populated with data)
    
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible(); //check that it exists -- returns boolean value
    expect(bool).toBeTruthy();  //TODO: check evauluation if not fixed at end of course
    await page.locator("li[class='totalRow'] button[type='button']").click(); //checkout button
    // await page.pause();

    //checkout page
    await page.locator("[placeholder*='Country']").pressSequentially("ro", {delay:100}); // input field, shows results per input so pressing 1letter at a time
    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.waitFor(); //wait until is shown
    const countryDropdownCount = await countryDropdown.locator("button").count();
    for(let i=0; i<countryDropdownCount; ++i){
        const text = await countryDropdown.locator("button").nth(i).textContent();
        if(text === " Romania"){  //could use trim to trim spaces, or can use the 'includes' option
            await countryDropdown.locator("button").nth(i).click();
            break;
        }
    }
    // await page.pause();

    //asertions for the page
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click(); // place order button
})