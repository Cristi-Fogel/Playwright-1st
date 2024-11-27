import { Page } from "@playwright/test"; 
// const { LoginPage } = require('./loginPage'); //JS import, changing it to TS import
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";

export class POManager{
    //define type, must be done within TS; on JS not necesary duh 
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    ordersReviewPage: OrdersReviewPage;
    ordersHistoryPage: OrdersHistoryPage;

constructor(page:any){
    this.page = page; 
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.ordersReviewPage = new OrdersReviewPage(page);
    this.ordersHistoryPage = new OrdersHistoryPage(page);
}

getLoginPage(){
    return this.loginPage
}
getDashboardPage(){
    return this.dashboardPage
}
getCartPage(){
    return this.cartPage
}
getOrdersReviewPage(){
    return this.ordersReviewPage
}
getOrdersHistoryPage(){
    return this.ordersHistoryPage
}
}

module.exports = {POManager}