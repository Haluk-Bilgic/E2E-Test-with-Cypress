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
