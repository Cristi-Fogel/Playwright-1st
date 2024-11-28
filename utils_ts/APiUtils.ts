export class APiUtils { 

    apiContext: any;
    loginPayload: string;
    loginURL: string;
    createOrderURL: string;
    
    constructor(apiContext: any, loginPayload: string) {
    this.apiContext = apiContext; // context is class-level
    this.loginPayload = loginPayload;
    this.loginURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
    this.createOrderURL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
    }
    
    async getToken() {
    const loginResponse = await this.apiContext.post(this.loginURL, {
    data: this.loginPayload
    });
    // expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log("Token is: " + token);
    return token;
    }
    
    async createOrder(orderPayload: string) {
    let response = { token: "", orderId: "" };
    response.token = await this.getToken();
    
    const orderResponse = await this.apiContext.post(this.createOrderURL, {
    data: orderPayload, 
    headers: {
    'Authorization': response.token,
    'Content-Type': 'application/json'
    },
    });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    // console.log("grabbed order id: " + orderId);
    response.orderId = orderId;
    return response;
    }
}

module.exports = { APiUtils };