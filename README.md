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

usefull typescript comands-cmd:
- "tsc demo.ts" --> generates demo.js

2. to run in cmd:
  node demo1.js

updates needed:
- apiUtils and test-base need to be updated to TS file and format;
- PageObjects files -> init locators and variables used in tests

----
Cucumber:
1. install cmd @ project level:
npm install @cucumber/cucumber

2. cucumber plugin in VSC:
- File>Settings>Preferences>Extensions: Cucumber Gerkin 
- restart system

3. setup project
- create a 'features' folder (cucumber will look for that)
- write a feature file in project level --> features
  - test will have .feature extnsion
    - test will have the given-when-then structure
    - create step definition file (with used tag -> description)
    - link steps to actions
      - skeleton can be defined by cucumber by default when trying to run the feature file for 1st time
        - can run by cmd: npx cucumber-js
          - this will execute node_modules->.bin-> cucumber-js 
          - will show in terminal what/how is missing
- inside the features folder, create 'step_definitions' folder
  - inside it, write 'steps.js' this will be where you partition existing test(s) and write all steps
  - can add code within the coresponding brackets -- marked with write code here 
    - if you have await in your code-block, make the function async
    - eliminate the return line;
- WORLD constructor:
  - use of this. to access classes across when/then blocks;
  - add timeout if a block might take more than 5seconds to loadup

- npx cucumber-js --exit to run (will run in headless mode) 
  - with the exit argument will come out of terminal

- can add cucumber.js file
  - add instructuions to it, on how to behave when running tests;

- create the support folder for HOOKS
  - with before: create the setup part
  - with after: close and cleanup environment, cookies
  - can use BeforeStep/AfterStep to take a screenshot (if step fails);


4. running an explicit cucumber features-test set:
  cmd: npx cucumber-js features/ErrorValidations.feature --exit
    - can use this to create syntax after it WILL fail 1st time

5. use of tags:
   tags: @Regression / @Validation  (with more than one tag, set one under the other)
   cmd: npx cucumber-js --tags "@Regression" --exit

5.1. tagged hooks:
  - tags can be used in hooks, so that they will run ONLY into certain test groups (ex: in hooks use regession tags to run regression setup)
  - can also set OR clauses
  Before({tags: "@foo or @bar"}, function(){ ////});


6. PARAMETRIZATION:
  @feature, instead of Scenario --> Scenario Outline
   <!-- Given a login to Ecommerce2 application with "<username>" and "<password>" -->
   to encapsulate in brackets <> the code will pick up examples/parameters
     Examples:
      | username          | password      |
      | cf@mailinator.com | Password1     |
       
