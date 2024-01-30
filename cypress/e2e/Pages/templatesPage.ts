export class TemplatesPage {
  templateId = Cypress.env("CYPRESS_TEMPLATE_ID");

  searchInputInTemp = '[placeholder="Discover popup templates"]';
  selectButtons = '[id*="template-select-button"]';
  detailsButtonWithId = `[id=template-detail-button-${this.templateId}]`;

  verifyPlaybookPageIsDisplayed() {
    cy.location("pathname", { timeout: 12000 }).should("include", "playbook");
  }
  searchTemplate(templateName: string) {
    cy.get(this.searchInputInTemp).type(templateName).wait(500);
  }
  selectTemplate(templateName?: string, order?: string) {
    cy.wait(1000);
    if (templateName == undefined) {
      cy.get(this.selectButtons, { timeout: 10000 })
        .first()
        .invoke("show")
        .click();
    } else if (templateName == "id") {
      cy.get(this.detailsButtonWithId, { timeout: 10000 })
        .invoke("show")
        .click();
    } else {
      this.searchTemplate(templateName);
      if (order == "first") {
        cy.get(this.selectButtons, { timeout: 10000 })
          .invoke("show")
          .first()
          .click();
      } else if (order == "last") {
        cy.get(this.selectButtons, { timeout: 10000 })
          .invoke("show")
          .last()
          .click();
      } else {
        cy.get(this.selectButtons, { timeout: 10000 })
          .invoke("show")
          .first()
          .click();
      }
    }
  }
}
