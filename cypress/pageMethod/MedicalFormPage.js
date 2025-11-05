import { MedicalFormPageElement } from "../pageElement/MedicalFormPageElement";

export class MedicalFormPage {
    element = new MedicalFormPageElement();

    /**
     * Types text into an input field after clearing it
     * @param {string} element - CSS selector for the input element
     * @param {string} fieldValue - Value to type into the field
     */
    enterTextField = (element, fieldValue) => {
        if (fieldValue === undefined || fieldValue === null) {
            throw new Error(`Field value is undefined for element: ${element}`);
        }

        if (!element) {
            throw new Error('Element selector is undefined or null');
        }

        cy.log(`Filling element: ${element} with value: ${fieldValue}`);
        cy.get(element, { timeout: 10000 })
          .should('exist')
          .should('be.visible')
          .should('be.enabled')
          .clear()
          .type(fieldValue);
    }

    /**
     * Clicks a button
     * @param {string} buttonSelector - CSS selector for the button
     */
    clickButton = (buttonSelector) => {
        cy.log(`Clicking button: ${buttonSelector}`);
        cy.get(buttonSelector, { timeout: 10000 })
          .should('exist')
          .should('be.visible')
          .should('be.enabled')
          .click();
    }


    /**
     * Verifies medical form page is loaded
     */
    verifyMedicalFormPageLoaded = () => {
        cy.log('Verifying Medical Form page loaded');
        
        // Check for "Medical Form" title
        cy.contains('Medical Form', { timeout: 10000 }).should('be.visible');
        
        // Check for form completion status message
        cy.contains('To be completed by your doctor').should('be.visible');
        
        cy.log('✅ Medical Form page verified');
    }

    /**
     * Opens the accordion section if it's collapsed
     */
    expandAccordionIfNeeded = () => {
        cy.log('Checking accordion state');
        
        cy.get('body').then(($body) => {
            // Check if accordion is collapsed (data-state="closed")
            const closedAccordion = $body.find('div[data-state="closed"]');
            
            if (closedAccordion.length > 0) {
                cy.log('Expanding accordion');
                cy.get('button[role="button"]').first().click();
                cy.wait(500); // Wait for animation
            } else {
                cy.log('Accordion already expanded');
            }
        });
    }


    /**
     * Fills the Doctor Name field
     * @param {string} doctorName - Doctor's full name
     */
    fillDoctorName = (doctorName) => {
        cy.log(`Filling Doctor Name: ${doctorName}`);
        this.enterTextField(this.element.doctorName, doctorName);
    }

    /**
     * Fills the Doctor Email field
     * @param {string} doctorEmail - Doctor's email address
     */
    fillDoctorEmail = (doctorEmail) => {
        cy.log(`Filling Doctor Email: ${doctorEmail}`);
        this.enterTextField(this.element.doctorEmail, doctorEmail);
    }

    /**
     * Fills the Contact Number field
     * @param {string} contactNumber - Contact phone number
     */
    fillContactNumber = (contactNumber) => {
        cy.log(`Filling Contact Number: ${contactNumber}`);
        this.enterTextField(this.element.contactNumber, contactNumber);
    }

/**
     * Fills the Clinic Name field
     * @param {string} clinicName - Clinic name
     */
    fillClinicName = (clinicName) => {
        cy.log(`Filling Clinic Name: ${clinicName}`);
        this.enterTextField(this.element.clinicName, clinicName);
    }

    /**
     * Fills all doctor information fields
     * @param {string} doctorName - Doctor's name
     * @param {string} doctorEmail - Doctor's email
     * @param {string} contactNumber - Contact number
     * @param {string} clinicName - Clinic name
     */
    fillDoctorInformation = (doctorName, doctorEmail, contactNumber, clinicName) => {
        cy.log('=== Filling Doctor Information Section ===');
        
        this.fillDoctorName(doctorName);
        this.fillDoctorEmail(doctorEmail);
        this.fillContactNumber(contactNumber);
        this.fillClinicName(clinicName);
        
        cy.log('✅ Doctor information filled');
    }

    /**
     * Submits the medical form
     */
    submitMedicalForm = () => {
        cy.log('Submitting Medical Form');
        
        cy.contains('button', 'Send Request', { timeout: 10000 })
          .should('be.visible')
          .should('be.enabled')
          .click();
        
        cy.log('✅ Medical form submitted');
    }

    /**
     * MASTER METHOD: Fills and submits the complete medical form
     * @param {Object} formData - Medical form data object
     */
    fillCompleteMedicalForm = (formData) => {
        cy.log('=== Starting Complete Medical Form Fill ===');
        
        // Verify page is loaded
        this.verifyMedicalFormPageLoaded();
        
        // Expand accordion if needed
        this.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Fill all doctor information
        this.fillDoctorInformation(
            formData.doctorName,
            formData.doctorEmail,
            formData.contactNumber,
            formData.clinicName
        );
        
        // Submit the form
        this.submitMedicalForm();
        
        cy.log('=== Complete Medical Form Fill Finished ===');
    }

    /**
     * Fills the Clinic Name field
     * @param {string} clinicName - Clinic name
     */
    fillClinicName = (clinicName) => {
        cy.log(`Filling Clinic Name: ${clinicName}`);
        this.enterTextField(this.element.clinicName, clinicName);
    }

    /**
     * Fills all doctor information fields
     * @param {string} doctorName - Doctor's name
     * @param {string} doctorEmail - Doctor's email
     * @param {string} contactNumber - Contact number
     * @param {string} clinicName - Clinic name
     */
    fillDoctorInformation = (doctorName, doctorEmail, contactNumber, clinicName) => {
        cy.log('=== Filling Doctor Information Section ===');
        
        this.fillDoctorName(doctorName);
        this.fillDoctorEmail(doctorEmail);
        this.fillContactNumber(contactNumber);
        this.fillClinicName(clinicName);
        
        cy.log('✅ Doctor information filled');
    }

    /**
     * Submits the medical form
     */
    submitMedicalForm = () => {
        cy.log('Submitting Medical Form');
        
        cy.contains('button', 'Send Request', { timeout: 10000 })
          .should('be.visible')
          .should('be.enabled')
          .click();
        
        cy.log('✅ Medical form submitted');
    }

    /**
     * MASTER METHOD: Fills and submits the complete medical form
     * @param {Object} formData - Medical form data object
     */
    fillCompleteMedicalForm = (formData) => {
        cy.log('=== Starting Complete Medical Form Fill ===');
        
        // Verify page is loaded
        this.verifyMedicalFormPageLoaded();
        
        // Expand accordion if needed
        this.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Fill all doctor information
        this.fillDoctorInformation(
            formData.doctorName,
            formData.doctorEmail,
            formData.contactNumber,
            formData.clinicName
        );
        
        // Submit the form
        this.submitMedicalForm();
        
        cy.log('=== Complete Medical Form Fill Finished ===');
    }
}
