import { CustomizePage } from "../Pages/customizePage";
import { DashboardPage } from "../Pages/dashboardPage";
import { LoginPage } from "../Pages/loginPage";
import { SettingsPage } from "../Pages/settingsPage";
import { TargetPage } from "../Pages/targetPage";
import { TemplatesPage } from "../Pages/templatesPage";

const url = Cypress.env("baseUrl");
const myWebsite = Cypress.env("website");
const pathName = Cypress.env("pathName");
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const templatesPage = new TemplatesPage();
const settingsPage = new SettingsPage();
const customizePage = new CustomizePage();
const targetPage = new TargetPage();

const netlifyBase = "https://api.netlify.com/api/v1/";
const netlifyToken = "68vlpTPInmNg5WmDkvIIC0IY9mea_5k-xHA85XA2jVs";
const netlifySiteId = "4d2b5ea1-8211-4cf5-81cb-6a8795a6e559";
const myPassword = "test82";

describe("E2E scenario from register to publish and display popup with Watermark-Smart Mode", () => {
  before(() => {
    cy.fixture("templateName").then(function (data) {
      this.data = data;
    });
  });
  it("Register - Create and Publish popup with Smart mode", function () {
    cy.visit(url);
    loginPage.clickRegisterButton();
    loginPage.verifyRegisterPageIsDisplayed();
    cy.task("getEmail").then((randomEmail) => {
      loginPage.fillFirstPage(randomEmail as string);
    });
    loginPage.fillSecondPage(myPassword);
    loginPage.VerifyCaptcha();
    loginPage.clickRegisterButton();
    templatesPage.verifyPlaybookPageIsDisplayed();
    settingsPage.checkLayoutAndClickButton(myWebsite, "Verify now");
    settingsPage.displayNoVerifiedWebsiteModal();
    settingsPage.addEmbedCodeToNetlify(
      netlifyBase,
      netlifySiteId,
      netlifyToken
    );
    settingsPage.verifyWebsite();
    settingsPage.checkWebsiteIsVerified();
    templatesPage.selectBusinessGoal("All Templates");
    templatesPage.selectTemplate(this.data.templateName6);
    customizePage.verifyTitle();
    customizePage.displayAndCloseEmailToastMessage();
    customizePage.goToPublishPage();
    targetPage.clickPublishButton();
    targetPage.successMessageIsVisible();
  });
});
