export class BrowserUtils {
  intercomIframe = '[name="intercom-tour-frame"]';

  clickFromKeyboard(element: string, key: string) {
    cy.get(element).type(key);
  }
  iframeContains(iframeEl: string, element: string) {
    cy.get(iframeEl)
      .should('be.visible')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .and('contain.text', element);
  }
  goForwardInTime() {
    cy.clock();
    cy.reload();
    cy.wait(1000);
    cy.tick(11000);
    cy.tick(11000);
    cy.clock().invoke('restore');
  }
}
