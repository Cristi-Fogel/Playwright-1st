const playwright =  require('playwright/test');
const { POManager } = require("../../pageObjects/POManager");
const { Before, After, BeforeStep, AfterStep, Status } = require ('@cucumber/cucumber');


Before(async function() {
    const browser = await playwright.chromium.launch({
        headless: false //run browser showing, default is true
    });
    
    const context = await browser.newContext();
    this.page = await context.newPage();    
    this.poManager = new POManager(this.page); // this. will make sure it's accessible outside this block (avoid null-pointer exception)
});

BeforeStep(function(){

});
AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});

After (function(){
    console.log("execution end log line => You are sexy");
});