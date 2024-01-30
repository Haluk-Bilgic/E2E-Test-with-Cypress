import { DashboardPage } from "../e2e/Pages/dashboardPage";
import { LoginPage } from "../e2e/Pages/loginPage";
import { TemplatesPage } from "../e2e/Pages/templatesPage";

const dashboardPage = new DashboardPage();
const loginPage = new LoginPage();
const templatesPage = new TemplatesPage();

const email = Cypress.env("email");
const password = Cypress.env("password");
const myPopup = Cypress.env("popupName");
const url = Cypress.env("baseurl");

Cypress.on("uncaught:exception", () => {
  return false;
});
Cypress.Commands.add("login", () => {
  loginPage.entermail(email);
  loginPage.enterPassword(password);
  loginPage.clicksubmit();
  dashboardPage.verifyTitle();
});
Cypress.Commands.add(
  "createNewCampaign",
  (
    myPopup: string,
    myWebsite: string,
    templateName?: string,
    order?: string
  ) => {
    dashboardPage.createCampaign(myPopup, myWebsite);
    templatesPage.verifyPlaybookPageIsDisplayed();
    templatesPage.selectTemplate(templateName, order);
  }
);
Cypress.Commands.add("deleteCampaign", (email: string, password: string) => {
  cy.request({
    url: `https://api.popupsmart.xyz/api/Auth/customer-login`,
    method: "POST",
    headers: {
      accept: "application/json",
      contentType: "application/json",
    },
    body: {
      email: `${email}`,
      password: `${password}`,
    },
  }).then((res) => {
    let token = res.body["token"];
    cy.request({
      url: `https://app.popupsmart.xyz/api/graphql`,
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: `{"operationName":"Campaigns","variables":{"filter":{"limit":999,"skip":0,"name":"${myPopup}","domainIds":[],"sortBy":"CreatedAt","order":"DESC"}},"query":"query Campaigns($filter: CampaignsFilter!) {\\n  me {\\n    isPageViewBlocked\\n    __typename\\n  }\\n  campaigns(filter: $filter) {\\n    hasFullAccess\\n    total\\n    items {\\n      id\\n      name\\n      isActive\\n      publishVersion\\n      isTemplateSelected\\n      createdAt\\n      domains {\\n        id\\n        url\\n        verified\\n        cms\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}"}`,
    }).then((res) => {
      const camps = res.body.data.campaigns.items;
      camps.forEach((camp: { id: number }) => {
        cy.request({
          url: `https://api.popupsmart.xyz/api/Campaign/${camp.id}`,
          method: "DELETE",
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        });
      });
    });
  });
});
Cypress.Commands.add("deleteCampaignBeforeTest", () => {
  dashboardPage.deleteIfThereIsAnyCampaign(myPopup);
});
Cypress.Commands.add("loginWithSession", () => {
  cy.session("login", () => {
    cy.deleteCampaign(email, password);
    cy.visit(url);
    cy.login();
  });
});
Cypress.Commands.add("clickForce", { prevSubject: "element" }, (element) => {
  return cy.wrap(element).click({ force: true });
});
export {};
