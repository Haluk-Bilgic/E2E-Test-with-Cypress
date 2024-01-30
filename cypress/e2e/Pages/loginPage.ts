export class LoginPage {
  emailTextBox = '[data-testid="email"]';
  passwordTextBox = '[data-testid="password"]';
  submitButton = "#loginbutton";
  infoPanel = "[id='user-info-panel']";
  title = "Login - Popupsmart: A Better Popup Builder";
  firstnameInput = "[id='firstname']";
  lastnameInput = "[id='lastname']";
  domainInput = "[id='domain']";
  privacyCheckbox = "[id='privacy_policy']";
  registerButton = "Register";

  verifyTitle() {
    cy.title({ timeout: 10000 }).should("eq", this.title);
  }
  entermail(email: string) {
    cy.get(this.emailTextBox).type(email);
  }
  enterPassword(password: string) {
    cy.get(this.passwordTextBox).should("be.enabled").type(password);
  }
  clicksubmit() {
    cy.get(this.submitButton).click();
  }
  checkSubmitButtonIsDisabled() {
    cy.get(this.submitButton).should("be.disabled");
  }

  //Register Part
  clickRegisterButton() {
    cy.contains(this.registerButton).click();
  }
  verifyRegisterPageIsDisplayed() {
    cy.location("pathname").should("include", "register");
  }
  fillFirstPage(myEmail: string) {
    cy.get(this.firstnameInput).type("Test");
    cy.get(this.lastnameInput).type("automation");
    cy.get(this.emailTextBox).type(myEmail);
    cy.contains("Next").click();
  }
  fillSecondPage(myPassword: string) {
    cy.get(this.passwordTextBox).type(myPassword);
    cy.get(this.domainInput).type("ps-e2e-test.netlify.app");
    cy.get(this.privacyCheckbox).check();
  }
  VerifyCaptcha() {
    cy.get("iframe").then((iframe) => {
      cy.wrap(iframe)
        .first()
        .its("0.contentDocument.body")
        .should("not.be.undefined")
        .and("not.be.empty")
        .then(cy.wrap)
        .find("#recaptcha-anchor")
        .should("be.visible")
        .click()
        .should("be.focused")
        .wait(500);
    });
  }
  clickSignInButton() {
    cy.contains("Sign in").click();
  }
}
