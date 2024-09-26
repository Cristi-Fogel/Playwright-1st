const base = require('@playwright/test');

exports.customTest = base.test.extend({
        //can add fixtures (browser, page, your own)
        testDataForOrder :
            {
            username: "cf@mailinator.com",
            password: "Password1",
            productName: "ZARA COAT 3"
            }
    }
)