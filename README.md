Practice part from Rahul Shetty's Playwright course.

Setup:
- node.js up to date;
- within package, there is the ExcelJS library imported for some tests that grab and pass excel data
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

Run an explicit run session (ex: regression, web, api)
1. within package.json add the runs you want to have set up;
2. cmd: npx run webApi

Allure:
- just a diferent way of reporting shown

Jenkins:
- need jdk 17 or jdk21
- in cmd run:
    1. download jenkins.war
    2. navigate to where that file is installed
    3. java -jar jenkins.war --httpPort=9090
* can use diferent port, check one that is not in use
 
 - in Jenkins:
  1. new project, can add gitRepo path or from localhost with setting a custom path 
  2. build steps -> Window(s) batch command OR Execute Shell (macOS) 
    2.1. input command to be executed: npm run regression
  3. save -> Build Now
  4. open up job -> console output for details

Setup Typescript:
1. install cmd: npm install -D typescript
------
usefull typescript comands-cmd:
- "tsc demo.ts" --> generates demo.js

2. to run in cmd:
  node demo1.js



