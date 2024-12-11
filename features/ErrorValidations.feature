Feature: Ecommerce2 validations
    @Validation
    @foo
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error Message is displayed

        Examples:
        | username           | password     |
        | cf@mailinator.com  | Password1    |
        | cf@maildwdwdx.com  | Password2    |
       