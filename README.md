Practice part from Rahul Shetty's playwright course.

Setup:
- node.js up to date;
- within package, there is the excelJS library imported for some tests that grab and pass excel data
  "exceljs": "^4.4.0"

Description:
APiUtils - classes that get tokens and create orders (backend stuff mostly)
placeholderTestData.json  - test data to be used and passed within tests
test-base.js - test login data, additional ones can be added and picked up within tests
state.json - storing cookies from API within tests to be picked up and used (skipping the login part of tests -> win time)


Usage:
- config file for normal run;
    ex: npx playwright test

- config1 file for custom runs;
  ex: npx playwright test tests/RS_ClientAppPO.spec --config playwright.config1.js --project=safari   

- tagging tests, to run just web/api tests
  // @Web --> tagged test 
// can run with npx playwright test --grep @Web

