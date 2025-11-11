import { LoginPage } from "../pageMethod/LoginPage";

const loginPage = new LoginPage();

describe('Badisa Login Test', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.visitLoginPage("https://app.mybadisa.org/en/auth/signin");
  });

  it('Successfully logs in with valid credentials', () => {

    // Log environment variables to verify
    cy.log('Email from env:', Cypress.env('email'));
    cy.log('Password from env:', Cypress.env('password') ? '****' : 'Not set');

    // Perform login
    loginPage.login(
      Cypress.env('email'),
      Cypress.env('password')
    );

    // Successful redirect check
    cy.url().should('not.include', '/signin');
    cy.contains('Dashboard', { timeout: 10000 }).should('exist');
  });

});

