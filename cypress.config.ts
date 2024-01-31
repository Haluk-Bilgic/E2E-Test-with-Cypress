const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: "https://app.popupsmart.xyz",
    website: "ps-e2e-test.netlify.app",
    popupName: "cypress-popup",
    email: "pscypress@test.com",
    password: "t2",
    pathName: "About",
  },
  e2e: {
    hideXHRInCommandLog: true,
    defaultCommandTimeout: 6000,
    includeShadowDom: true,
    viewportHeight: 900,
    viewportWidth: 1440,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    video: true,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      let randomEmail: string = `test${Math.floor(
        Math.random() * 100000
      )}+e2e@popupsmart.com`;
      on("task", {
        getEmail: () => {
          return randomEmail;
        },
      });
    },
  },
});
