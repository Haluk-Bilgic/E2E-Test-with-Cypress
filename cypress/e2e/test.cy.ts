describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
    const aa = Cypress.env("CYPRESS_EMAIL");
    cy.log(aa);
  });
});
