Practice part from Rahul Shetty's playwright course.

Setup:
- node.js;


Usage:
- config file for normal run;
    ex: npx playwright test

- config1 file for custom runs;
  ex: npx playwright test tests/RS_ClientAppPO.spec --config playwright.config1.js --project=safari   

- tagging tests, to run just web/api tests
  // @Web --> tagged test 
// can run with npx playwright test --grep @Web

