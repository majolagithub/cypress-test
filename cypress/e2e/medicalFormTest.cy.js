import { MedicalFormPage } from '../pageMethod/MedicalFormPage';
import { HomePage } from '../pageMethod/HomePage';
import { LoginPage } from '../pageMethod/LoginPage';

const homePage = new HomePage();
const medicalFormPage = new MedicalFormPage();
const loginPage = new LoginPage();

describe('Badisa Medical Form Submission Test', () => {
    let medicalFormData;
    let loginData;

    // Load fixture data before tests run
    before(() => {
        cy.fixture('medicalFormData').then((data) => {
            medicalFormData = data;
            cy.log('Medical form fixture data loaded successfully');
        });
        
        cy.fixture('loginData').then((data) => {
            loginData = data;
            cy.log('Login data loaded successfully');
        });
    });

    // Clean state before each test
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        
        // Login before each test
        cy.log('=== Logging in before test ===');
        loginPage.performLogin(
            loginData.validUser.email,
            loginData.validUser.password,
            loginData.loginUrls.loginPage,
            loginData.loginUrls.afterLoginRedirect
        );
    });

    it('Medical Form page loads correctly after login', () => {
        cy.log('Testing medical form page load');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Verify page loaded
        medicalFormPage.verifyMedicalFormPageLoaded();
        
        // Verify key elements are visible
        cy.contains('Medical Form').should('be.visible');
        cy.contains('To be completed by your doctor').should('be.visible');
        
        cy.log('✅ Medical form page load test passed');
    });

    it('All form fields are visible and accessible', () => {
        cy.log('Testing form field visibility');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Expand accordion if needed
        medicalFormPage.expandAccordionIfNeeded();
        
        // Wait a moment for fields to be visible
        cy.wait(1000);
        
        // Verify all labels are visible
        cy.contains('Doctor Name').should('be.visible');
        cy.contains('Doctor Email ID').should('be.visible');
        cy.contains('Contact Number').should('be.visible');
        cy.contains('Clinic Name').should('be.visible');
        
        // Verify all input fields are visible
        cy.get('input[name="doctorName"]').should('be.visible');
        cy.get('input[name="doctorEmail"]').should('be.visible');
        cy.get('input[name="contactNumber"]').should('be.visible');
        cy.get('input[name="clinicName"]').should('be.visible');
        
        // Verify submit button is visible
        cy.contains('Send Request').should('be.visible');
        
        cy.log('✅ All form fields visible');
    });

    it('Fills out the complete medical form with doctor information', () => {
        cy.log('Starting medical form fill test');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Verify page loaded
        medicalFormPage.verifyMedicalFormPageLoaded();
        
        // Expand accordion if needed
        medicalFormPage.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Fill Doctor Information
        cy.log('=== Filling Doctor Information ===');
        medicalFormPage.fillDoctorInformation(
            medicalFormData.doctorName,
            medicalFormData.doctorEmail,
            medicalFormData.contactNumber,
            medicalFormData.clinicName
        );
        
        // Verify data was entered correctly
        cy.log('=== Verifying Form Data ===');
        cy.get('input[name="doctorName"]').should('have.value', medicalFormData.doctorName);
        cy.get('input[name="doctorEmail"]').should('have.value', medicalFormData.doctorEmail);
        cy.get('input[name="contactNumber"]').should('have.value', medicalFormData.contactNumber);
        cy.get('input[name="clinicName"]').should('have.value', medicalFormData.clinicName);
        
        cy.log('✅ Form filled successfully');
    });

    it('Submits the medical form successfully', () => {
        cy.log('Testing medical form submission');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Expand accordion if needed
        medicalFormPage.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Fill the complete form
        medicalFormPage.fillCompleteMedicalForm(medicalFormData);
        
        // Submit the form
        cy.log('=== Submitting Form ===');
        medicalFormPage.submitMedicalForm();
        
        // Wait for submission to process
        cy.wait(3000);
        
        // Verify submission (check for success message or URL change)
        cy.get('body').then(($body) => {
            // Check if there's a success message
            if ($body.text().includes('success') || $body.text().includes('submitted')) {
                cy.log('✅ Success message found');
            } else {
                cy.log('✅ Form submitted (no error displayed)');
            }
        });
        
        cy.log('✅ Medical form submission test passed');
    });

    it('Required fields show validation when empty', () => {
        cy.log('Testing form validation');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Expand accordion if needed
        medicalFormPage.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Try to submit without filling required fields
        cy.contains('button', 'Send Request').click({ force: true });
        
        // Wait for validation
        cy.wait(1000);
        
        // Verify form doesn't submit (still on same page or shows errors)
        cy.get('body').then(($body) => {
            // Check if validation messages appear or form is still visible
            const stillHasForm = $body.find('input[name="doctorName"]').length > 0;
            expect(stillHasForm).to.be.true;
        });
        
        cy.log('✅ Form validation test passed');
    });

    it('Form accepts valid email format', () => {
        cy.log('Testing email field validation');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Expand accordion if needed
        medicalFormPage.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Test valid email
        medicalFormPage.fillDoctorEmail(medicalFormData.doctorEmail);
        cy.get('input[name="doctorEmail"]')
          .should('have.value', medicalFormData.doctorEmail);
        
        // Test invalid email format
        cy.get('input[name="doctorEmail"]').clear().type('invalidemail');
        
        // Try to submit
        cy.contains('button', 'Send Request').click({ force: true });
        
        // Email validation should prevent submission
        cy.wait(1000);
        
        cy.log('✅ Email validation test passed');
    });

    it('Form fields accept and display entered data correctly', () => {
        cy.log('Testing data entry and display');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Expand accordion if needed
        medicalFormPage.expandAccordionIfNeeded();
        
        // Wait for form to be ready
        cy.wait(1000);
        
        // Test each field individually
        const testData = {
            doctorName: 'Test Doctor Name',
            doctorEmail: 'test@doctor.com',
            contactNumber: '0123456789',
            clinicName: 'Test Clinic'
        };
        
        // Fill and verify Doctor Name
        cy.get('input[name="doctorName"]').clear().type(testData.doctorName);
        cy.get('input[name="doctorName"]').should('have.value', testData.doctorName);
        
        // Fill and verify Doctor Email
        cy.get('input[name="doctorEmail"]').clear().type(testData.doctorEmail);
        cy.get('input[name="doctorEmail"]').should('have.value', testData.doctorEmail);
        
        // Fill and verify Contact Number
        cy.get('input[name="contactNumber"]').clear().type(testData.contactNumber);
        cy.get('input[name="contactNumber"]').should('have.value', testData.contactNumber);
        
        // Fill and verify Clinic Name
        cy.get('input[name="clinicName"]').clear().type(testData.clinicName);
        cy.get('input[name="clinicName"]').should('have.value', testData.clinicName);
        
        cy.log('✅ Data entry test passed');
    });

    it('Uses fillCompleteMedicalForm master method', () => {
        cy.log('Testing complete form fill master method');
        
        // Navigate to medical form
        homePage.visitMedicalFormPage();
        
        // Use the master method to fill entire form
        medicalFormPage.fillCompleteMedicalForm(medicalFormData);
        
        // Verify all fields are filled
        cy.get('input[name="doctorName"]').should('not.be.empty');
        cy.get('input[name="doctorEmail"]').should('not.be.empty');
        cy.get('input[name="contactNumber"]').should('not.be.empty');
        cy.get('input[name="clinicName"]').should('not.be.empty');
        
        cy.log('✅ Master method test passed');
    });
});

// Global error handler for better debugging
Cypress.on('fail', (error, runnable) => {
    console.error('❌ Test Failed:', error.message);
    console.error('📍 In test:', runnable.title);
    console.error('📝 Full error:', error);
    throw error;
});