class APiUtils{ 

    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext; //context is class-level
        this.loginPayload = loginPayload;
        this.baseURL = "https://rahulshettyacademy.com";
        this.loginURL = this.baseURL + "/api/ecom/auth/login";
        this.landingURL = this.baseURL + "/client";
        this.createOrderURL = this.baseURL + "/api/ecom/order/create-order";
    }

    async getToken(){
        const loginResponse = await this.apiContext.post(this.loginURL, {
            data: this.loginPayload
        });
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log("Token is: " + token);
        return token;
    };

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post(this.createOrderURL, {
            data: orderPayload, 
            headers: {
                'Authorization': response.token,
                'Content-Type' : 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        // console.log("grabbed order id: "+ orderID);
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APiUtils};