class APIUtils{
    
    baseURL = "https://rahulshettyacademy.com";
    loginURL = baseURL + "/api/ecom/auth/login";
    landingURL = baseURL + "/client";
    createOrderURL = baseURL + "/api/ecom/order/create-order";
    


    constructor(apiContext)
    {
        this.apiContext = apiContext; //context is class-level
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post(loginURL, {
            data: this.loginPayload
        });
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log("Token is: " + token);
        return token;
    };

    async getOrder(orderPayload){
        const orderResponse = await this.apiContext.post(createOrderURL, {
            data: orderPayload, 
            headers: {
                'Authorization': this.getToken(),
                'Content-Type' : 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderID = orderResponseJson.orders[0];
        console.log("grabbed order id: "+ orderID);
        return orderID;
    }
}

module.exports = {APIUtils};