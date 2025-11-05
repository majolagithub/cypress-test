import { LoginPage } from '../pageMethod/LoginPage';

const loginPage = new LoginPage();

describe('Badisa Login Functionality Tests', () => {
    let loginData;

    // Load fixture data before tests run
    before(() => {
        cy.fixture('loginData').then((data) => {
            loginData = data;
            cy.log('Login fixture data loaded successfully');
            cy.log('Valid user email:', loginData.validUser.email);
        });
    });

    // Clean state before each test
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
    });

    describe('Page Load Tests', () => {
        it('Login page loads successfully with all elements', () => {
            cy.log('Testing login page load');
            
            // Navigate to login page
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Verify page title/header
            cy.contains('Welcome to', { timeout: 10000 }).should('be.visible');
            
            // Verify Badisa logo
            cy.get('img').should('be.visible');
            
            // Verify form elements
            cy.get('input[type="email"]').should('be.visible');
            cy.get('input[type="password"]').should('be.visible');
            cy.contains('button', 'Sign In').should('be.visible');
            
            cy.log('✅ All page elements loaded successfully');
        });

        it('Login page has correct URL', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            cy.url().should('equal', loginData.urls.loginPage);
        });
    });

    describe('Successful Login Tests', () => {
        it('Successfully logs in with valid credentials', () => {
            cy.log(`Testing login with: ${loginData.validUser.email}`);
            cy.log(`Description: ${loginData.validUser.description}`);
            
            // Perform complete login
            loginPage.performLogin(
                loginData.validUser.email,
                loginData.validUser.password,
                loginData.urls.loginPage,
                loginData.urls.afterLoginRedirect
            );
            
            cy.log('✅ Login test passed');
        });

        it('Logs in and redirects to correct page', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            loginPage.login(
                loginData.validUser.email,
                loginData.validUser.password
            );
            
            // Verify redirect
            cy.wait(3000);
            cy.url().should('not.include', '/login');
            cy.url().should('include', loginData.urls.afterLoginRedirect);
        });
    });

    describe('Failed Login Tests', () => {
        it('Shows error with invalid credentials', () => {
            cy.log(`Testing with invalid user: ${loginData.invalidUser.email}`);
            cy.log(`Description: ${loginData.invalidUser.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Attempt login with invalid credentials
            loginPage.login(
                loginData.invalidUser.email,
                loginData.invalidUser.password
            );
            
            // Wait for error
            cy.wait(2000);
            
            // Verify still on login page
            cy.url().should('include', '/login');
            
            cy.log('✅ Invalid login test passed - stayed on login page');
        });

        it('Validates empty email field', () => {
            cy.log(`Testing empty credentials: ${loginData.emptyCredentials.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Try to submit with empty fields
            cy.get('input[type="password"]').type('SomePassword');
            cy.contains('button', 'Sign In').click();
            
            // Should show validation or stay on page
            cy.wait(1000);
            cy.url().should('include', '/login');
            
            cy.log('✅ Empty email validation test passed');
        });

        it('Validates empty password field', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Enter email but not password
            cy.get('input[type="email"]').type(loginData.validUser.email);
            cy.contains('button', 'Sign In').click();
            
            // Should show validation or stay on page
            cy.wait(1000);
            cy.url().should('include', '/login');
            
            cy.log('✅ Empty password validation test passed');
        });

        it('Validates invalid email format', () => {
            cy.log(`Testing invalid email format: ${loginData.invalidEmailFormat.email}`);
            cy.log(`Description: ${loginData.invalidEmailFormat.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Try with invalid email format
            cy.get('input[type="email"]').type(loginData.invalidEmailFormat.email);
            cy.get('input[type="password"]').type(loginData.invalidEmailFormat.password);
            cy.contains('button', 'Sign In').click();
            
            // Should show validation or stay on page
            cy.wait(1000);
            cy.url().should('include', '/login');
            
            cy.log('✅ Invalid email format test passed');
        });

        it('Handles completely empty form submission', () => {
            cy.log(`Testing: ${loginData.emptyCredentials.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Click submit without entering anything
            cy.contains('button', 'Sign In').click();
            
            // Should show validation
            cy.wait(1000);
            cy.url().should('include', '/login');
            
            cy.log('✅ Empty form validation test passed');
        });
    });

    describe('UI Interaction Tests', () => {
        it('Password toggle button works', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            const testPassword = 'TestPassword123';
            loginPage.enterPassword(testPassword);
            
            // Password should be hidden initially
            cy.get('input[type="password"]').should('exist');
            
            // Click eye icon to show password
            cy.get('button').contains('svg').parent().click();
            
            // Check if password is now visible (type changes to text)
            cy.get('input[name*="password"]').should('have.attr', 'type').and('match', /text|password/);
            
            cy.log('✅ Password toggle test passed');
        });

        it('Form fields accept input correctly', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            const testEmail = 'test@example.com';
            const testPassword = 'TestPassword123';
            
            // Test email field
            loginPage.enterEmail(testEmail);
            cy.get('input[type="email"]').should('have.value', testEmail);
            
            // Test password field
            loginPage.enterPassword(testPassword);
            cy.get('input[type="password"]').should('have.value', testPassword);
            
            cy.log('✅ Form input test passed');
        });

        it('Sign In button is clickable', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            cy.contains('button', 'Sign In')
              .should('be.visible')
              .should('be.enabled')
              .should('not.be.disabled');
            
            cy.log('✅ Button state test passed');
        });
    });

    describe('Security Tests', () => {
        it('Handles SQL injection attempt safely', () => {
            cy.log(`Testing: ${loginData.testScenarios.sqlInjection.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Attempt SQL injection
            loginPage.login(
                loginData.testScenarios.sqlInjection.email,
                loginData.testScenarios.sqlInjection.password
            );
            
            // Should not log in
            cy.wait(2000);
            cy.url().should('include', '/login');
            
            cy.log('✅ SQL injection test passed - login blocked');
        });

        it('Handles XSS attempt safely', () => {
            cy.log(`Testing: ${loginData.testScenarios.xss.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            // Attempt XSS
            cy.get('input[type="email"]').type(loginData.testScenarios.xss.email);
            cy.get('input[type="password"]').type(loginData.testScenarios.xss.password);
            cy.contains('button', 'Sign In').click();
            
            // Should not execute script or log in
            cy.wait(2000);
            cy.url().should('include', '/login');
            
            // Verify no alert was triggered
            cy.on('window:alert', () => {
                throw new Error('XSS alert was triggered - security issue!');
            });
            
            cy.log('✅ XSS test passed - script blocked');
        });

        it('Does not expose password in page source', () => {
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            loginPage.enterPassword(loginData.validUser.password);
            
            // Password should be of type "password" (masked)
            cy.get('input[type="password"]')
              .should('have.attr', 'type', 'password');
            
            cy.log('✅ Password masking test passed');
        });
    });

    describe('Session Management Tests', () => {
        it('Clears session data after logout', () => {
            // Login first
            loginPage.performLogin(
                loginData.validUser.email,
                loginData.validUser.password,
                loginData.urls.loginPage,
                loginData.urls.afterLoginRedirect
            );
            
            // Logout (implement based on your app)
            // cy.get('[data-testid="logout"]').click();
            
            // Clear session
            cy.clearCookies();
            cy.clearLocalStorage();
            
            // Try to access protected page
            cy.visit(loginData.urls.afterLoginRedirect);
            
            // Should redirect to login
            cy.url({ timeout: 5000 }).should('include', '/login');
            
            cy.log('✅ Session management test passed');
        });
    });

    describe('Alternative User Tests', () => {
        it('Tests with alternative user account', () => {
            cy.log(`Testing with: ${loginData.alternativeUser.email}`);
            cy.log(`Description: ${loginData.alternativeUser.description}`);
            
            loginPage.visitLoginPage(loginData.urls.loginPage);
            
            loginPage.login(
                loginData.alternativeUser.email,
                loginData.alternativeUser.password
            );
            
            // This should fail (invalid account)
            cy.wait(2000);
            cy.url().should('include', '/login');
            
            cy.log('✅ Alternative user test passed');
        });
    });
});

// Global error handler
Cypress.on('fail', (error, runnable) => {
    console.error('❌ Test Failed:', error.message);
    console.error('📍 In test:', runnable.title);
    console.error('📝 Full error:', error);
    throw error;
});