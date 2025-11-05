
import { HomePageElement } from "../pageElement/HomePageElement";

export class HomePage {
    element = new HomePageElement();

    /**
     * Navigates to the Waiting List Form page
     */
    visitWaitingListFormPage = () => {
        cy.log('Navigating to Waiting List Form page');
        cy.visit('/en/waitlist'); // Add /en/
        cy.url().should('include', '/waitlist');
        cy.log('Waiting List Form page loaded');
    }

        /**
     * Clicks the Join Waitlist button (if navigation via button is needed)
     */
    clickJoinWaitlist = () => {
        cy.log('Clicking Join Waitlist button');
        cy.get(this.element.joinWaitListBtn).click();
        cy.url().should('include', '/waitlist');
        cy.log('Navigated to waitlist via button');
    }

        /**
     * Navigates to home page
     */
    visitHomePage = () => {
        cy.log('Navigating to Home page');
        cy.visit('/'); 
        cy.url().should('not.include', '/login');
        cy.log('Home page loaded');
    }


    /**
     * Navigates to the Medical Form page
     */
    visitMedicalFormPage = () => {
        cy.log('Navigating to Medical Form page');
        cy.visit('/en/medical-form'); //Add /en/
        cy.url().should('include', '/medical-form');
        cy.log('Medical Form page loaded');
    }


    // /**
    //  * Navigates to Events page
    //  */
    // visitEventsPage = () => {
    //     cy.log('Navigating to Events page');
    //     cy.visit('/en/events');
    //     cy.url().should('include', '/events');
    //     cy.log('Events page loaded');
    // }

    // /**
    //  * Navigates to Dashboard page
    //  */
    // visitDashboardPage = () => {
    //     cy.log('Navigating to Dashboard page');
    //     cy.visit('/en/dashboard');
    //     cy.url().should('include', '/dashboard');
    //     cy.log('Dashboard page loaded');
    // }
}

