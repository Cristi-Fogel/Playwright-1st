// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  retries: 2,  //retry failure tests
  workers: 1,  //paralelism execution (if only one, no simultaneous execuions will run; default is 5)
  timeout: 30 * 1000, 
  expect: {timeout: 5000},   
  reporter: 'html',
  /*
  reporter can be also allure:
  setup: npm install --save-dev @playwright/test allure-playwright
  cmd line use: npx playwright test --grep @Web --reporter=line,allure-playwright
  this will create allure-results folder
  generate: allure generate ./allure-results

  powershell admin:
  run: Set-ExecutionPolicy RemoteSigned
  revert with:  Set-ExecutionPolicy Restricted


  */

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */


  /* Configure projects for major browsers */
  projects: [
    { 
      // to run:  
      // D:\z_programming\auto\playwright\1stCourse> npx playwright test tests/RS_ClientAppPO.spec --config playwright.config1.js --project=safari    
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false, 
        screenshot: 'on',
        video: 'retain-on-failure',  // only failing tests should have vids now
        trace: 'off',
        ...devices['iPhone 11'], //explicit website
        ignoreHTTPSErrors: true, // SSL certification error auto-accept
        permissions: ['geolocation'],
        
      }
    }, 
    {  
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false, 
        screenshot: 'off',
        trace: 'off',
        viewport: {width:720, height:720} //for explicit browser size #Responsive
      }
    }
    
  ],

 
});

