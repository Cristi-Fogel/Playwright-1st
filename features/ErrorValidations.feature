Feature: Ecommerce2 validations
    @Validation
    Scenario: Placing the Order
        Given a login to Ecommerce2 application with "cf@mailinator.com" and "Password1"
        Then Verify Error Message is displayed
       