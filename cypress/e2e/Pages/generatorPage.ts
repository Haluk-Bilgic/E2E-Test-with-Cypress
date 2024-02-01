export class Generator {
  canvasElement = '[data-element-id="canvas"]';
  watermark = ".watermark-container";

  checkPopupIsVisible() {
    cy.get(this.canvasElement, { timeout: 8000 }).should("be.visible");
  }
  checkWatermarkIsDisplayed() {
    cy.get(this.watermark).should("exist");
  }
  checkPopupIsNotVisible() {
    cy.get(this.canvasElement).should("not.be.visible");
  }
  checkPopupIsNotExist() {
    cy.get(this.canvasElement).should("not.exist");
  }
  goForwardInTime() {
    cy.clock();
    cy.reload();
    cy.wait(1000);
    cy.tick(11000);
    cy.tick(11000);
    cy.clock().invoke("restore");
  }
}
