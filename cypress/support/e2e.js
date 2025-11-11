// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', () => false);

//Move cy commands inside beforeEach hook
beforeEach(() => {
  cy.get('body').then(($body) => {
    $body[0].style.transition = 'none';
    $body[0].style.animation = 'none';
  });
});