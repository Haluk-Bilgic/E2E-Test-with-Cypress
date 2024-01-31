export class TargetPage {
  titlePublishPage = "Popupsmart Campaign Builder - Publish";
  publishButton = "[id='publish-page-publish-button']";

  clickPublishButton() {
    cy.title().should("eq", this.titlePublishPage);
    cy.get(this.publishButton).click();
  }
  successMessageIsVisible() {
    cy.contains("Successfully published", { timeout: 15000 }).should(
      "be.visible"
    );
  }
}
