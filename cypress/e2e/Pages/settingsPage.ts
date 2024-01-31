export class SettingsPage {
  title = "Popupsmart Campaign Builder - Settings";
  layoutDomainField = '[class*="BuilderLayout_domainName"]';
  noVerifiedWebsiteModal = '[class*="NoVerifiedWebsiteModal_container"]';
  dataId = '[class="language-htmlbars"] span > span:nth-child(10)';
  customWebsiteEmbedCode = '[class*="Code_code"]';
  verifyWebsiteButton = '[id="no-verified-modal-verify-button"]';
  verificationLabel = '[class*="NoVerifiedWebsiteModal_label"]';
  refreshButton = "Refresh";

  checkLayoutAndClickButton(domainFieldText: string, psButton: string) {
    cy.get(this.layoutDomainField).within(() => {
      cy.contains(domainFieldText).should("be.visible");
      cy.contains(psButton).should("be.visible").click();
    });
  }
  displayNoVerifiedWebsiteModal() {
    cy.get(this.noVerifiedWebsiteModal).should("be.visible");
  }
  addEmbedCodeToNetlify(
    netlifyBase: string,
    netlifySiteId: string,
    netlifyToken: string
  ) {
    cy.wait(1000);
    cy.get(this.dataId).invoke("text").should("have.length.at.least", 5);
    cy.get(this.customWebsiteEmbedCode).then((embedC) => {
      const embedCode = embedC.text();

      cy.request({
        url: `${netlifyBase}/sites/${netlifySiteId}/snippets/0`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${netlifyToken}`,
        },
        body: {
          title: "Cypress Automated Test",
          general: embedCode,
        },
      }).then((res) => {
        const id = res.body["id"];
        if (id == "0") {
          cy.log(`Added embed code:${res.body["general"]}`);
        }
      });
    });
  }
  verifyWebsite() {
    cy.get(this.verifyWebsiteButton).click();
  }
  clickRefreshButton() {
    cy.contains(this.refreshButton).click();
  }
  checkWebsiteIsVerified() {
    let number = 0;

    const reloadAndCheck = () => {
      cy.get(this.verificationLabel).then((label) => {
        if (label.text() == "Verified") {
          return;
        }
        if (number == 10) {
          cy.log("Tried 10 times to verify but Failed");
          return;
        }
        number++;
        cy.wait(1000);
        this.clickRefreshButton();
        reloadAndCheck();
      });
    };
  }
}
