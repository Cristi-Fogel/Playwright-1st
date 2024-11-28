import {test as baseTest} from '@playwright/test';  // TS import

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{
    testDataForOrder: TestDataForOrder
    }>({
        //can add fixtures (browser, page, your own)
        //group data you'd want to send for one of the tests
        testDataForOrder: {
        username: "cf@mailinator.com",
        password: "Password1",
        productName: "ZARA COAT 3"
        }
    }
)
