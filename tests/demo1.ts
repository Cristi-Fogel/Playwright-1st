import { expect, type Locator, type Page } from '@playwright/test';

let message1 : string = "hello";
message1  = "just stings";

let age1: number = 20;
let isActive1: boolean = true;
let numbers1: number[] = [1,2,3];

let data1: any = "unkown data type";
data1 = "anyData"; // can accept diferent data type, as it :any

// function example
function addX(a: number, b: number): number{
    return a+b;
};
addX(3,4);

// object example
let user1: {name: string, age: number, location:string} = {name: "Bob", age:34, location: "default"};
user1.location = "home";  //instant moan

// class demo 
class CartPage{ 
    page: Page; // from documentation type is set as page
    cartProducts: Locator; // these are locators duh, not strings or whatevers
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
}