const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    embeddedScreenshots: true
  },
  retries: {
    runMode: 2,
    openMode: 1
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  experimentalWebKitSupport: true,
  defaultCommandTimeout: 5000,
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env:{
      baseUrl : "",
      adminUser: "admin",
      adminPass: "admin"
    }
  }
});