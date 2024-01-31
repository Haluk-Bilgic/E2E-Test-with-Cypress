import { SettingsPage } from "./settingsPage";
import { TargetPage } from "./targetPage";

export class CustomizePage {
  settingsPage = new SettingsPage();
  targetPage = new TargetPage();
  title = "Popupsmart Campaign Builder - Publish";
  sidebar = '[id="sidebar"]';
  customizePageButton = '[id="builder-customize-button"]';
  stepIcons = '[class*="StepItem_icon"]>svg';
  publishPageButton =
    "[id='builder-publish-button'][data-testid='publish_step']";
  verifyMailToastMessage = '[id="verify-your-email-toast"]';

  verifyTitle() {
    cy.location("pathname").should("include", "customize");
    cy.title().should("eq", this.title);
    cy.get(this.sidebar).should("be.visible");
    cy.get(this.customizePageButton).then((btn) => {
      cy.get(this.stepIcons).should("be.visible");
      cy.wrap(btn).should("be.visible");
    });
  }
  goToPublishPage() {
    cy.get(this.publishPageButton).click();
  }
  displayAndCloseEmailToastMessage() {
    cy.get(this.verifyMailToastMessage).then((mes) => {
      cy.wrap(mes).should("be.visible");
      cy.contains("Close").click();
      cy.wrap(mes).should("not.be.visible");
    });
  }
}
