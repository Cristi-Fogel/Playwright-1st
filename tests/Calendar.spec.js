const {test, expect} = require("@playwright/test");

test('Calendars validations', async ({page})=>
{
    const monthNumber = "5";
    const date = "14"; 
    const year = "2027";
    const expectedDate = [monthNumber, date, year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click(); //second click to select year within calendar thingy
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click(); //select all cells, can pass to click on nth() one
    await page.locator("//abbr[text()='"+date+"']").click(); //pass the date within the locator 

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) //go through all 3 datepicker elements
    {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedDate[index]); 
    }
})
    