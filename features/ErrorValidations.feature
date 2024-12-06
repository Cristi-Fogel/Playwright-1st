Feature: Ecommerce2 validations

    Scenario: Placing the Order
        Given a login to Ecommerce2 application with "cf@mailinator.com" and "Password1"
        Then Verify Error Message is displayed

#          await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
#    await userNameInput.fill("rahulshe");
#    await page.locator("[type='password']").fill("learning");
#    await signInButton.click();
#         # //no explicit wait needed like selenium (takes one from config 30s) 
#     console.log(await page.locator("[style*='block']").textContent()); // grab text
#     await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //no need to have all text, just one word in this case
    