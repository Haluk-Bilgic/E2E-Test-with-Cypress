declare namespace Cypress {
  interface Chainable {
    login(): void;
    createNewCampaign(
      myPopup: string,
      myWebsite: string,
      templateName?: string,
      order?: string
    ): void;
    deleteCampaign(email: string, password: string): void;
    deleteCampaignBeforeTest(): void;
    loginWithSession(): void;
    clickForce();
  }
  interface ResolvedConfigOptions {
    hideXHRInCommandLog?: boolean;
  }
}
