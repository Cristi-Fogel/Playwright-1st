const {test, expect} = require('@playwright/test');

test('Playwright locators check', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click(); //labelText
    await page.getByLabel("Employed").check(); //checkbox will be check/uncheck
    await page.getByLabel("Gender").selectOption("Female"); //select option from a dropdown
    await page.getByPlaceholder("Password").fill("myPassword123");
    await page.getByRole("button", {name: "submit"}).click();  //byRole, will filter all buttons, so give argument of what you want

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();  //scans whole page 

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); //only one button in card, so no filtering needed here
})
