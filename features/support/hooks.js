const playwright =  require('playwright/test');
const { POManager } = require("../../pageObjects/POManager");
const { Before, After } = require ('@cucumber/cucumber');


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
AfterStep(function({result}){
    
});

After (function(){
    console.log("execution end log");
});