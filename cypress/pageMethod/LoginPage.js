

import { LoginPageElement } from "../pageElement/LoginPageElement";

export class LoginPage {
    element = new LoginPageElement();

    /**
     * Visits the login page
     * @param {string} url - Login page URL
     */
    visitLoginPage = (url = 'https://app.mybadisa.org/en/login') => {
        cy.log(`Navigating to login page: ${url}`);
        cy.visit(url);
        
        // Wait for page to load - check for Welcome text
        cy.contains('Welcome to', { timeout: 15000 }).should('be.visible');
        
        // Verify form is visible
        cy.get(this.element.emailInput, { timeout: 10000 }).should('be.visible');
        
        cy.log('✅ Login page loaded successfully');
    }

    /**
     * Verifies login page elements are visible
     */
    verifyLoginPageLoaded = () => {
        cy.log('Verifying login page elements');
        
        // Check for key elements
        cy.contains('Welcome to').should('be.visible');
        cy.get(this.element.emailInput).should('be.visible');
        cy.get(this.element.passwordInput).should('be.visible');
        cy.get(this.element.signInButton).should('be.visible');
        cy.get(this.element.forgotPasswordLink).should('be.visible');
        
        cy.log('✅ All login page elements verified');
    }

    /**
     * Enters email into the email field
     * @param {string} email - Email address
     */
    enterEmail = (email) => {
        if (!email) {
            throw new Error('Email is required');
        }
        
        cy.log(`Entering email: ${email}`);
        
        cy.get(this.element.emailInput, { timeout: 10000 })
          .should('be.visible')
          .should('be.enabled')
          .clear()
          .type(email)
          .should('have.value', email);
        
        cy.log('Email entered successfully');
    }

    /**
     * Enters password into the password field
     * @param {string} password - Password
     */
    enterPassword = (password) => {
        if (!password) {
            throw new Error('Password is required');
        }
        
        cy.log('Entering password');
        
        cy.get(this.element.passwordInput, { timeout: 10000 })
          .should('be.visible')
          .should('be.enabled')
          .clear()
          .type(password);
        
        cy.log('Password entered successfully');
    }

    /**
     * Toggles password visibility by clicking the eye icon
     */
    togglePasswordVisibility = () => {
        cy.log('Toggling password visibility');
        
        cy.get(this.element.togglePasswordButton, { timeout: 5000 })
          .should('be.visible')
          .click();
        
        cy.log('Password visibility toggled');
    }

    /**
     * Clicks the Sign In button
     */
    clickSignInButton = () => {
        cy.log('Clicking Sign In button');
        
        cy.get(this.element.signInButton, { timeout: 10000 })
          .should('be.visible')
          .should('be.enabled')
          .click();
        
        cy.log('Sign In button clicked');
    }

    /**
     * Clicks the Forgot Password link
     */
    clickForgotPassword = () => {
        cy.log('Clicking Forgot Password link');
        
        cy.get(this.element.forgotPasswordLink, { timeout: 5000 })
          .should('be.visible')
          .click();
        
        // Verify navigation to forgot password page
        cy.url({ timeout: 10000 }).should('include', '/forgot-password');
        
        cy.log('✅ Navigated to Forgot Password page');
    }


    /**
     * Verifies successful login by checking URL change
     * @param {string} expectedUrl - Expected URL path after login (default: /waitlist)
     */
    verifySuccessfulLogin = (expectedUrl = '/waitlist') => {
        cy.log('Verifying successful login');
        
        // Wait for navigation away from login page
        cy.wait(3000);
        
        // Verify URL changed from login page
        cy.url({ timeout: 15000 }).should('not.include', '/login');
        
        // If specific URL provided, verify it
        if (expectedUrl) {
            cy.url().should('include', expectedUrl);
        }
        
        cy.log(`Login successful - navigated to: ${expectedUrl}`);
    }

    /**
     * Verifies login error is displayed
     */
    verifyLoginError = () => {
        cy.log('Verifying login error message');
        
        // Wait a moment for error to appear
        cy.wait(2000);
        
        // Check for error in various ways
        cy.get('body').then(($body) => {
            const bodyText = $body.text();
            
            if (bodyText.includes('Invalid') || 
                bodyText.includes('incorrect') || 
                bodyText.includes('failed') ||
                bodyText.includes('error')) {
                cy.log('Error message found in body text');
            } else {
                // Alternative: check if still on login page
                cy.url().should('include', '/login');
                cy.log('Login failed - still on login page');
            }
        });
    }

    /**
     * Verifies required field validation
     */
    verifyRequiredFieldValidation = () => {
        cy.log('Verifying required field validation');
        
        // Click submit without filling fields
        this.clickSignInButton();
        
        // Wait for validation
        cy.wait(1000);
        
        // Should still be on login page
        cy.url().should('include', '/login');
        
        cy.log('Required field validation working');
    }


    /**
     * Performs login with email and password
     * @param {string} email - Email address
     * @param {string} password - Password
     */
    login = (email, password) => {
        cy.log(`=== Logging in as: ${email} ===`);
        
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSignInButton();
        
        cy.log('Login form submitted');
    }

    /**
     * Complete login flow: navigate, login, and verify
     * @param {string} email - Email address
     * @param {string} password - Password
     * @param {string} loginUrl - Login page URL
     * @param {string} expectedRedirectUrl - Expected URL after login
     */
    performLogin = (
        email, 
        password, 
        loginUrl = 'https://app.mybadisa.org/en/login', 
        expectedRedirectUrl = '/waitlist'
    ) => {
        cy.log('=== Starting Complete Login Flow ===');
        
        // Step 1: Navigate to login page
        this.visitLoginPage(loginUrl);
        
        // Step 2: Wait for form to be ready
        cy.get(this.element.passwordInput, { timeout: 10000 }).should('be.visible');
        
        // Step 3: Perform login
        this.login(email, password);
        
        // Step 4: Verify successful login
        this.verifySuccessfulLogin(expectedRedirectUrl);
        
        cy.log('=== Login Flow Complete ===');
    }

    /**
     * Login with session caching for better performance
     * Uses cy.session() to cache authentication
     * @param {string} email - Email address
     * @param {string} password - Password
     */
    performLoginWithSession = (email, password) => {
        cy.session(
            [email, password], // Session identifier
            () => {
                // This code runs only once per unique [email, password] combination
                cy.log('Creating new session');
                this.performLogin(email, password);
            },
            {
                validate: () => {
                    // Verify session is still valid
                    cy.visit('/waitlist');
                    cy.url().should('not.include', '/login');
                }
            }
        );
    }
}
