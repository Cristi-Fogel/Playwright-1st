Feature: Ecommerce validations

    Scenario: Placing the Order
        Given a login to Ecommerce application with "cf@mailinator.com" and "Password1"
        When Add "zara coat 3" to Cart
        Then verify that "zara coat 3" is displayed in the Cart page
        When Enter valid details and Place the order
        Then verify order is present in the OrderHistory page
