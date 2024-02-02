import { BrowserUtils } from "../../support/browserUtils";
import { CustomizePage } from "../Pages/customizePage";
import { DashboardPage } from "../Pages/dashboardPage";
import { Generator } from "../Pages/generatorPage";
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
const generator = new Generator();
const browserUtils = new BrowserUtils();

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
  it("Check Watermark and Popup are displayed with Smart Mode", () => {
    cy.visit(`https://${myWebsite}/${pathName}`);
    cy.wait(22000);
    generator.checkPopupIsVisible();
    generator.checkWatermarkIsDisplayed();
  });
  it("Check Popup is not displayed on home page", () => {
    cy.visit(`https://${myWebsite}`);
    browserUtils.goForwardInTime();
    generator.checkPopupIsNotExist();
  });
  it("Check Popup is not displayed on other pages without doing any user behaviour", () => {
    cy.visit(`https://${myWebsite}/${pathName}`);
    cy.wait(2000);
    generator.checkPopupIsNotVisible();
  });
  it("Delete Account", () => {
    cy.task("getEmail").then((randomEmail) => {
      cy.visit(url);
      loginPage.entermail(randomEmail as string);
      loginPage.enterPassword(myPassword);
      loginPage.clicksubmit();
      dashboardPage.clickCampaignsPage();
      dashboardPage.verifyTitle();
      dashboardPage.openUserInfoPanel();
      dashboardPage.clickButtonFromPanel("Personal Data");
      dashboardPage.deleteAccount(randomEmail as string);
    });
  });
});
