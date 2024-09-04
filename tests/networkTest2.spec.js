



test('Security test request intercept', async(page)=>
{
    //login and reach orders page

    //intercept the view-call
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661884053f676546b6'
        })

    )
    //once identified *all, click on View button for it
    await page.locator("button:has-text('View')").click();

})