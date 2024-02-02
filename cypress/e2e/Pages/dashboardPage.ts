import { LoginPage } from "./loginPage";

export class DashboardPage {
  loginPage = new LoginPage();

  title = "Popupsmart - Dashboard";
  newCampaignButton = "#dashboard-new-campaign";
  campaignNameTextBox = "#campaignName";
  websiteDropdownMenu = "#create-campaign-modal-domain-select";
  campaignCards = '[class*="CampaignCardListView_campaignCard"]';
  addedCampaignText = "[class*='CampaignCardListView_title']";
  campaignCardActionButton = "[id*='menu-button']";
  deleteSubButton = "Delete";
  deletButtonInModal = "#delete-campaign-modal-delete-button";
  campaignsButton = "[id=dashboard-left-menu-campaign]";
  infoPanel = "[id='user-info-panel']";
  accountTitle = "Account - Popupsmart";
  accountMailTextbox = '[id="email"]';
  checkBoxAccount = "[type*=checkbox]";

  verifyTitle() {
    cy.title({ timeout: 15000 }).should("eq", this.title);
  }
  createCampaign(myPopup: string, myUrl: string) {
    this.clickNewCmapignButton();
    cy.get(this.campaignNameTextBox).type(myPopup);
    cy.get(this.websiteDropdownMenu).then((menu) => {
      cy.wrap(menu)
        .click()
        .type(`${myUrl}{enter}` + `{enter}`);
    });
  }
  clickNewCmapignButton() {
    cy.get(this.newCampaignButton, { timeout: 13000 }).click();
  }
  deleteCampaign(myPopup: string) {
    cy.get(this.addedCampaignText).first().should("contain.text", myPopup);
    cy.get(this.campaignCardActionButton).first().click();
    cy.contains(this.deleteSubButton).click();
    cy.get(this.deletButtonInModal).click();
    cy.get(this.newCampaignButton, { timeout: 13000 });
    cy.contains(myPopup).should("not.exist");
  }
  deleteIfThereIsAnyCampaign(myPopup: string) {
    let number = 0;
    const deleteCamp = () => {
      cy.wait(100);
      cy.get("body").then(($parent) => {
        if (
          $parent.find(this.campaignCards).length > 0 &&
          $parent.find(this.campaignCards).length !== 7
        ) {
          this.deleteCampaign(myPopup);
          cy.reload();
          number = 0;
          deleteCamp();
        } else if ($parent.find(this.campaignCards).length == 7) {
          number++;
          cy.reload();
          cy.wait(2000);
          if (number == 4) {
            this.deleteCampaign(myPopup);
          }
          deleteCamp();
        }
      });
    };
    deleteCamp();
  }
  clickCampaignsPage() {
    cy.get(this.campaignsButton).first().click();
  }
  openUserInfoPanel() {
    cy.get(this.infoPanel).click();
  }
  clickButtonFromPanel(panelButton: string) {
    cy.contains(panelButton).clickForce();
  }
  deleteAccount(myEmail: string) {
    cy.contains("Delete your account").clickForce();
    cy.title().should("eq", this.accountTitle);
    cy.get(this.checkBoxAccount).first().check();
    cy.get(this.checkBoxAccount).last().check();
    cy.contains("Delete my account").click();
    cy.contains("Continue").click();
    cy.get(this.accountMailTextbox).type(myEmail);
    cy.contains("Delete Account").click();
    this.loginPage.verifyTitle();
  }
}
