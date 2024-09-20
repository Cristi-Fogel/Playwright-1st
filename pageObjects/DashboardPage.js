class DashboardPage{

constructor(page){
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("button[routerlink='/dashboard/cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName){
    await this.products.first().waitFor(); // products to loadup

    const titles = await this.products.allTextContents();
    console.log(titles); 
    // await page.pause();
    //hunt for product 'Zara Coat 4' to click on it
    const countProducts = await this.products.count();
    for (let i=0; i < countProducts; ++i)
    {
        if(await this.products.nth(i).locator("b").textContent() === productName)
            //chained locators won't work, so we write them completely
        {
            //logic to add product to cart, since we've identified the one we search for
            await this.products.nth(i).locator("text= Add To Cart").click();  
            break; //found it, no need to continue loop
        }
    }
// await page.pause();
}

async navigateToCart(){
    await  this.cart.dispatchEvent('click');
}
async navigateToOrders()
{
    await this.orders.click();
}

}

module.exports = {DashboardPage}