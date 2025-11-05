// This test verifies that the form can be filled successfully using Page Object Model (POM).
import { FormPage } from '../pageMethod/FormPage';
import { HomePage } from '../pageMethod/HomePage';

const homePage = new HomePage();
const formPage = new FormPage();

describe('Form Submission Test', () => {
    let formData;

    // Load fixture data before tests run
    before(() => {
        cy.fixture('formData').then((data) => {
            formData = data;
            cy.log('Fixture data loaded successfully');
        });
    });

    //beforeEach to ensure clean state
    beforeEach(() => {
        // Clear cookies and local storage before each test
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Fills out the complete form using data from fixture', () => {
        // Verify fixture data loaded
        cy.wrap(formData).should('not.be.undefined');
        
        // Log form data for debugging (optional - remove in production)
        cy.log('Starting form fill test');
        cy.log('Form data keys:', Object.keys(formData).join(', '));

        // Navigate to the form
        homePage.visitHomePage();
        homePage.visitWaitingListFormPage();

        // Wait for form to be ready (adjust selector as needed)
        cy.get('form', { timeout: 10000 }).should('be.visible');


        //Fill initial selections
        // cy.log('=== Filling Initial Selections ===');
        // formPage.fillInitialSelections(
        //     formData.facilityNameSelection,
        //     formData.housingCategory,
        //     formData.livingOption,
        //     formData.dateOfBirth
        // );

        // Fill Basic Information
        cy.log('=== Filling Basic Information ===');
        formPage.fillBasicInfo(
            formData.fullNames,
            formData.lastName,
            formData.id,
            formData.email,
            formData.phoneNumberOwn,
            formData.phoneNumberChild,
            formData.address,
            formData.postalCode
        );

        // Fill Demographics
        cy.log('=== Filling Demographics ===');
        formPage.fillDemographics(
            formData.homeLanguage,
            formData.religion,
            formData.occupation
        );

        // Fill Funeral Details
        cy.log('=== Filling Funeral Details ===');
        formPage.fillFuneralDetails(
            formData.name,
            formData.phoneNumber,
            formData.referenceNumber,
            formData.address1
        );

        // Fill Hospital Details
        cy.log('=== Filling Hospital Details ===');
        formPage.fillHospitalDetails(
            formData.hospitalName,
            formData.fileNumber
        );

        // Fill Medical Fund Information
        cy.log('=== Filling Medical Fund ===');
        formPage.fillMedicalFund(
            formData.medicalFund,
            formData.planName,
            formData.medicalAidNumber,
            formData.doctorName,
            formData.doctorPhone
        );

        // Fill Child Details
        cy.log('=== Filling Child Details ===');
        formPage.fillChildDetails(
            formData.childFullName,
            formData.childPhoneNo,
            formData.childCellNo,
            formData.childEmail,
            formData.childAddress,
            formData.childRelationship,
            formData.childOccupation
        );

        // Fill Medical Condition
        cy.log('=== Filling Medical Condition ===');
        formPage.fillMedicalCondition(
            formData.healthStatus,
            formData.medicalDiagnosis,
            formData.allergies
        );

        // Fill Help Needed
        cy.log('=== Filling Help Needed ===');
        formPage.fillHelpNeeded(
            formData.needMobility,
            formData.mobilityDescription,
            formData.needBathing,
            formData.bathingDescription
        );

        // Fill Financial Management
        cy.log('=== Filling Financial Management ===');
        formPage.fillFinancialManagement(
            formData.canDoFinancesMyself,
            formData.needFinancialHelp,
            formData.someoneManagesFinances
        );

        // Fill Intake Timing
        cy.log('=== Filling Intake Timing ===');
        formPage.fillIntakeTiming(
            formData.intakeImmediately,
            formData.intakeWithin3Months,
            formData.intakeWithin6Months,
            formData.intakeLater
        );

        //Fill Previous Care History
        cy.log('=== Filling Previous Care History ===');
        formPage.fillPreviousCareHistory(
            formData.previouslyTaken,
            formData.facilityName,
            formData.facilityContact,
            formData.leavingReason
        );

        //Accept Declarations
        cy.log('=== Accepting Declarations ===');
        formPage.acceptDeclarations();

        // Fill Signatures
        cy.log('=== Filling Signatures ===');
        formPage.fillSignatures(
            formData.applicantProxyName,
            formData.witnessName
        );

        //assertions to verify form was filled
        cy.log('=== Form Fill Complete - Verifying Data ===');
        
        //assertions (adjust selectors as needed)
        cy.get('#fullNames').should('have.value', formData.fullNames);
        cy.get('#email').should('have.value', formData.email);
        cy.get('#applicantName').should('have.value', formData.applicantProxyName);
        cy.get('#witnessName').should('have.value', formData.witnessName);

        //Submit the form
        cy.log('=== Submitting Form ===');
        formPage.submitForm(formData.sendCopyToEmail);
        
        //Wait for submission and verify success
        cy.wait(2000); // Adjust based on your app's response time
        
        // Verify success (adjust based on your app)
        cy.url({ timeout: 15000 }).should('satisfy', (url) => {
            return url.includes('/success') || url.includes('/thank-you') || url.includes('/confirmation');
        });
        
        // OR check for success message
        // cy.contains(/successfully submitted|thank you|application received/i, { timeout: 10000 })
        //   .should('be.visible');
        
        cy.log('Form submitted successfully!');
    });

    //Test using the complete form method
    it('Fills out and submits form using fillCompleteForm method', () => {
        homePage.visitHomePage();
        homePage.visitWaitingListFormPage();
        
        // Wait for form to be ready
        cy.get('form', { timeout: 10000 }).should('be.visible');
        
        // Use the complete form method
        formPage.fillCompleteForm(formData);
        
        // Verify submission
        cy.wait(2000);
        cy.url({ timeout: 15000 }).should('satisfy', (url) => {
            return url.includes('/success') || url.includes('/thank-you') || url.includes('/confirmation');
        });
        
        cy.log('Complete form method test passed!');
    });

    //test to verify validation errors
    it('Shows validation errors for empty required fields', () => {
        homePage.visitHomePage();
        homePage.visitWaitingListFormPage();
        
        //submit empty form
        cy.get('button[type="submit"]').scrollIntoView().click({ force: true });
        
        // Check for validation messages (adjust selectors as needed)
        cy.contains(/required|mandatory|must be filled/i, { matchCase: false, timeout: 5000 })
          .should('be.visible');
    });

    //test for partial form fill
    it('Allows saving partial form data', () => {
        homePage.visitHomePage();
        homePage.visitWaitingListFormPage();
        
        // Fill only basic info
        formPage.fillBasicInfo(
            formData.fullNames,
            formData.lastName,
            formData.id,
            formData.email,
            formData.phoneNumberOwn,
            formData.phoneNumberChild,
            formData.address,
            formData.postalCode
        );
        
        // Verify data persists (adjust based on your app's behavior)
        cy.get('#fullNames').should('have.value', formData.fullNames);
        cy.get('#lastName').should('have.value', formData.lastName);
        cy.get('#email').should('have.value', formData.email);
    });

    // Test individual sections
    it('Tests declaration section independently', () => {
        homePage.visitHomePage();
        homePage.visitWaitingListFormPage();
        
        // Scroll to declarations
        cy.contains('Declaration', { timeout: 10000 }).scrollIntoView();
        
        // Accept all declarations
        formPage.acceptDeclarations();
        
        // Verify all checkboxes are checked
        cy.get('button[id^="decl-"]').each(($checkbox) => {
            cy.wrap($checkbox).should('have.attr', 'aria-checked', 'true');
        });
        
        cy.log('All declarations accepted successfully');
    });
});

// Global error handler for better debugging
Cypress.on('fail', (error, runnable) => {
    console.error('❌ Test Failed:', error.message);
    console.error('📍 In test:', runnable.title);
    console.error('📝 Full error:', error);
    throw error;
});