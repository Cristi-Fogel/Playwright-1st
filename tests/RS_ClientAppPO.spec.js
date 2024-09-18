const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');

test('Browser check', async ({page})=>
{
    const poManager = new POManager(page);
    const searchForProductName = 'ZARA COAT 3';
    const username = "cf@mailinator.com";
    const password = "Password1";
    
    const loginPage = poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(username, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(searchForProductName);
    await dashboardPage.navigateToCart();
    
    //goto cart
    await page.waitForLoadState('networkidle') 
    await page.locator("button[routerlink='/dashboard/cart']").dispatchEvent('click');
    await page.locator("div li").first().waitFor(); //wait until 1st item of list of items show up (1st item in list is populated with data)
    
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible(); //check that it exists -- returns boolean value
    expect(bool).toBeTruthy();  //TODO: check evauluation if not fixed at end of course
    await page.locator("li[class='totalRow'] button[type='button']").click(); //checkout button
    await page.waitForLoadState('networkidle') 
    // await page.pause();

    //checkout page
    await page.locator("[placeholder*='Country']").pressSequentially("ro", {delay:3200}); // input field, shows results per input so pressing 1letter at a time
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
    expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click(); // place order button

    //thankyou for oder page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID is: " + orderID); 
    
    //orders page 
    await page.locator("button[routerlink='/dashboard/myorders']").dispatchEvent('click');
    await page.locator("tbody").waitFor(); //waiting for whole table-body to loadup, prior to making the evaluation #async breakage
    const rows = await page.locator("tbody tr"); //waiting for table data to be loaded up
    
    for(let i=0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
}) 