// Contains methods that interact with the form page
import { FormPageElement } from "../pageElement/FormPageElement";

export class FormPage {
    element = new FormPageElement();

    // /**
    //  * Selects a facility from the dropdown
    //  * @param {string} facilityName - Name of the facility (e.g., "Ons Huis (Citrusdal)")
    //  */
    // selectFacilityByName = (facilityName) => {
    //     cy.log(`Selecting facility: ${facilityName}`);
        
    //     // Click the FIRST combobox dropdown (facility dropdown)
    //     cy.get('button[role="combobox"]', { timeout: 10000 })
    //     .first()  //Get only the first one
    //     .should('be.visible')
    //     .click();
    //     // Wait for dropdown to open
    //     cy.wait(500);
        
    //     // Click the option with the facility name
    //     cy.contains(facilityName, { timeout: 10000 })
    //     .should('be.visible')
    //     .click({ force: true });       
    //     cy.log(`Selected facility: ${facilityName}`);
    // }

    // /**
    //  * Selects housing category from dropdown
    //  * @param {string} category - Text to display (e.g., "Room or Shared Room Housing")
    //  */
    // selectHousingCategory = (categoryText) => {
    //     cy.log(`Selecting housing category: ${categoryText}`);
        
    //     // Click the second combobox (housing category)
    //     cy.get('button[role="combobox"]', { timeout: 10000 })
    //     .eq(1)  //Get the second combobox (index 1)
    //     .should('be.visible')
    //     .click();
        
    //     // Wait for dropdown to open
    //     cy.wait(500);
        
    //     // Click the option
    //     cy.contains(categoryText, { timeout: 10000 })
    //     .should('be.visible')
    //     .click({ force: true });
        
    //     cy.log(`Selected housing category: ${categoryText}`);
    // }

    // /**
    //  * Selects living option from dropdown
    //  * @param {string} optionText - Text to display (e.g., "Purchase Living Right")
    //  */
    // selectLivingOptionByValue = (optionText) => {
    //     cy.log(`Selecting living option: ${optionText}`);

    //     // Wait until the 3rd combobox exists and is enabled
    //     cy.get('button[role="combobox"]', { timeout: 20000 })
    //     .eq(2)
    //     .should('exist')
    //     .should('not.be.disabled')
    //     .should('be.visible')
    //     .click({ force: true }); // Force click as fallback

    //     // Wait for dropdown to open
    //     cy.wait(800);

    //     // Select the desired option
    //     cy.contains(optionText, { timeout: 20000 })
    //     .should('be.visible')
    //     .click({ force: true });

    //     cy.log(`Selected living option: ${optionText}`);
    // };

    // /**
    //  * Sets date of birth by typing into input
    //  * @param {string} dateString - Date in format "DD/MM/YYYY"
    //  */
    // setDateOfBirth = (dateString) => {
    //     cy.log(`Setting date of birth: ${dateString}`);
        
    //     // Click the date button to activate the input
    //     cy.get('button[aria-haspopup="dialog"]', { timeout: 10000 })
    //     .should('be.visible')
    //     .click();
    //     cy.wait(300);        

    //     // Type the date directly if there's an input field
    //     cy.get('input[placeholder*="Select date"]')
    //     .clear()
    //     .type(dateString);
    //     cy.get('body').type('{esc}');        
    //     cy.log(`Date of birth set: ${dateString}`);
    // }

    
    // fillInitialSelections = (facilityName, housingCategory, livingOption, dateOfBirth) => {
    //     cy.log('=== Filling Initial Form Selections ===');

    //     if (facilityName) this.selectFacilityByName(facilityName);
    //     if (housingCategory) this.selectHousingCategory(housingCategory);
    //     if (livingOption) this.selectLivingOptionByValue(livingOption);
    //     if (dateOfBirth) this.setDateOfBirth(dateOfBirth);

    //     cy.log('Initial selections complete');
    // }

    enterTextField = (element, fieldValue) => {
        if (fieldValue === undefined || fieldValue === null) {
            throw new Error(`Field value is undefined for element: ${element}`);
        }

        if (!element) {
            throw new Error('Element selector is undefined or null');
        }

        cy.log(`Filling element: ${element} with value: ${fieldValue}`);
        cy.get(element, { timeout: 100000 })
          .should('exist')
          .should('be.visible')
          .should('be.enabled')
          .clear()
          .type(fieldValue);
    }

    enterFormFieldValue = (element, fieldValue) => {
        this.enterTextField(element, fieldValue);
    }

    selectOption = (optionSelector) => {
        cy.log(`Selecting option: ${optionSelector}`);
        cy.get(optionSelector, { timeout: 10000 })
          .should('exist')
          .should('be.visible')
          .click({ force: true });
    }

    checkCheckbox = (selector) => {
        cy.log(`Checking checkbox/button: ${selector}`);
        cy.get(selector)
          .scrollIntoView()
          .should('exist')
          .should('be.enabled')
          .click({ force: true })
          .should('have.attr', 'aria-checked', 'true');
    }

    checkRadixCheckbox = (checkboxSelector) => {
        if (checkboxSelector === undefined || checkboxSelector === null) {
            throw new Error(`Checkbox selector is undefined!`);
        }
        cy.log(`Checking Radix checkbox: ${checkboxSelector}`);
        cy.get(checkboxSelector, { timeout: 10000 })
          .should('exist')
          .then(($el) => {
            const isChecked = $el.attr('aria-checked') === 'true' || $el.attr('data-state') === 'checked';
            if (!isChecked) {
              cy.wrap($el).scrollIntoView().click({ force: true });
            }
          });
    }

    fillFormData = (
        fullNames,
        lastName,
        idNumber,
        email,
        phoneNumberOwn,
        phoneNumberChild,
        address,
        postalCode,
        homeLanguage,
        religion,
        occupation,
        name,
        phoneNumber,
        referenceNumber,
        address1,
        hospitalName
    ) => {
        this.fillBasicInfo(fullNames, lastName, idNumber, email, phoneNumberOwn, phoneNumberChild, address, postalCode);
        this.fillDemographics(homeLanguage, religion, occupation);
        this.fillFuneralDetails(name, phoneNumber, referenceNumber, address1);
        this.fillHospitalDetails(hospitalName, null);
    }

    fillBasicInfo = (fullNames, lastName, idNumber, email, phoneNumberOwn, phoneNumberChild, address, postalCode) => {
        cy.log('Filling Basic Info Section');
        this.enterFormFieldValue(this.element.fullNames, fullNames);
        this.enterFormFieldValue(this.element.lastName, lastName);
        this.enterFormFieldValue(this.element.idNumber, idNumber);
        this.enterFormFieldValue(this.element.emailAddress, email);
        this.enterFormFieldValue(this.element.phoneNumberOwn, phoneNumberOwn);
        this.enterFormFieldValue(this.element.phoneNumberChild, phoneNumberChild);
        this.enterFormFieldValue(this.element.address, address);
        this.enterFormFieldValue(this.element.postalCode, postalCode);
    }

    fillDemographics = (homeLanguage, religion, occupation) => {
        cy.log('Filling Demographics Section');
        this.selectOption(this.element.genderFemale);
        this.selectOption(this.element.raceBlack);
        this.selectOption(this.element.maritalSingle);
        this.enterFormFieldValue(this.element.homeLanguage, homeLanguage);
        this.enterFormFieldValue(this.element.religion, religion);
        this.enterFormFieldValue(this.element.occupation, occupation);
    }

    fillFuneralDetails = (name, phoneNumber, referenceNumber, address1) => {
        cy.log('Filling Funeral Details Section');
        this.enterFormFieldValue(this.element.name, name);
        this.enterFormFieldValue(this.element.phoneNumber, phoneNumber);
        this.enterFormFieldValue(this.element.referenceNumber, referenceNumber);
        this.enterFormFieldValue(this.element.address1, address1);
    }

    fillHospitalDetails = (hospitalName, fileNumber) => {
        cy.log('Filling Hospital Details Section');
        this.enterFormFieldValue(this.element.hospitalName, hospitalName);
        if (fileNumber) {
            this.enterFormFieldValue(this.element.fileNumber, fileNumber);
        }
    }

    fillMedicalFund = (medicalFund, planName, aidNumber, doctorName, doctorPhone) => {
        cy.log('Filling Medical Fund Section');
        this.enterFormFieldValue(this.element.nameOfMedicalFund, medicalFund);
        this.enterFormFieldValue(this.element.nameOfPlan, planName);
        this.enterFormFieldValue(this.element.medicalAidNumber, aidNumber);
        this.enterFormFieldValue(this.element.doctorName, doctorName);
        this.enterFormFieldValue(this.element.doctorPhoneNo, doctorPhone);
    }

    fillChildDetails = (fullName, phoneNo, cellNo, email, address, relationship, occupation) => {
        cy.log('Filling Child Details Section');
        this.enterFormFieldValue(this.element.childFullName, fullName);
        this.enterFormFieldValue(this.element.childPhoneNo, phoneNo);
        this.enterFormFieldValue(this.element.childCellNo, cellNo);
        this.enterFormFieldValue(this.element.childEmail, email);
        this.enterFormFieldValue(this.element.childAddress, address);
        this.enterFormFieldValue(this.element.childRelationship, relationship);
        this.enterFormFieldValue(this.element.childOccupation, occupation);
    }

    fillMedicalCondition = (healthStatus, diagnosis, allergies) => {
        cy.log('Filling Medical Condition Section');
        this.enterFormFieldValue(this.element.healthStatusTextarea, healthStatus);
        this.enterFormFieldValue(this.element.medicalDiagnosisTextarea, diagnosis);
        this.enterFormFieldValue(this.element.allergiesInput, allergies);
    }

    fillHelpNeeded = (needMobility, mobilityDesc, needBathing, bathingDesc) => {
        cy.log('Filling Help Needed Section');

        if (needMobility) {
            cy.log('Checking Mobility Assistance checkbox');
            cy.get(this.element.mobilityCheckbox)
                .scrollIntoView()
                .click({ force: true });

            if (mobilityDesc) {
                cy.log('Typing mobility description');
                cy.get('body').then(($body) => {
                    if ($body.find(this.element.mobilityDescribe).length > 0) {
                        cy.get(this.element.mobilityDescribe, { timeout: 20000 })
                            .should('exist')
                            .should('be.visible')
                            .type(mobilityDesc);
                    } else {
                        cy.wait(1000);
                        cy.get(this.element.mobilityDescribe, { timeout: 20000 })
                            .should('exist')
                            .should('be.visible')
                            .type(mobilityDesc);
                    }
                });
            }
        }
    }

    fillFinancialManagement = (canDoMyself, needHelp, someoneManages) => {
        cy.log('Filling Financial Management Section');
        if (canDoMyself) cy.get(this.element.canDoItMyselfCheckbox).scrollIntoView().click({ force: true });
        if (needHelp) cy.get(this.element.needHelpCheckbox).scrollIntoView().click({ force: true });
        if (someoneManages) cy.get(this.element.someoneManagesCheckbox).scrollIntoView().click({ force: true });
    }

    fillIntakeTiming = (immediately, within3Months, within6Months, later) => {
        cy.log('Filling Intake Timing Section');
        if (immediately) cy.get(this.element.immediatelyCheckbox).scrollIntoView().click({ force: true });
        if (within3Months) cy.get(this.element.within3MonthsCheckbox).scrollIntoView().click({ force: true });
        if (within6Months) cy.get(this.element.within6MonthsCheckbox).scrollIntoView().click({ force: true });
        if (later) cy.get(this.element.laterCheckbox).scrollIntoView().click({ force: true });
    }

    fillPreviousCareHistory = (previouslyTaken, facilityName, facilityContact, leavingReason) => {
        cy.log('Filling Previous Care History Section');
        if (previouslyTaken) {
            this.checkRadixCheckbox(this.element.previouslyTakenYes);
            cy.wait(500);
            if (facilityName) this.enterFormFieldValue(this.element.facilityName, facilityName);
            if (facilityContact) this.enterFormFieldValue(this.element.facilityContact, facilityContact);
            if (leavingReason) this.enterFormFieldValue(this.element.leavingReason, leavingReason);
        } else {
            this.checkRadixCheckbox(this.element.previouslyTakenNo);
        }
    }

    acceptDeclarations = () => {
        cy.log('Accepting all declarations');
        cy.get('button[id^="decl-"]').each(($checkbox) => {
            const isChecked = $checkbox.attr('aria-checked') === 'true' || $checkbox.attr('data-state') === 'checked';
            if (!isChecked) cy.wrap($checkbox).scrollIntoView().click({ force: true });
        });
    }

    fillSignatures = (applicantName, witnessName) => {
        cy.log('Filling Signature Section');
        cy.get(this.element.applicantProxyName).scrollIntoView();
        this.enterFormFieldValue(this.element.applicantProxyName, applicantName);
        this.enterFormFieldValue(this.element.witnessName, witnessName);
    }

    submitForm = (sendCopy = false) => {
        cy.log('Submitting form');
        if (sendCopy) this.checkRadixCheckbox(this.element.sendCopyCheckbox);
        cy.get(this.element.submitButton, { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible')
          .click();
    }

    selectFacility = (facilityName) => {
        if (facilityName) {
            cy.log(`Selecting facility: ${facilityName}`);
            cy.contains(facilityName).click();
        }
    }

    fillDeclarationDetails = (applicantProxyName, witnessName, sendCopyToEmail) => {
        cy.log('Filling Declaration Section');
        if (applicantProxyName) this.enterFormFieldValue(this.element.applicantProxyName, applicantProxyName);
        if (witnessName) this.enterFormFieldValue(this.element.witnessName, witnessName);
        if (sendCopyToEmail) this.checkRadixCheckbox(this.element.sendCopyCheckbox);
    }

    fillCompleteForm = (formData) => {
        cy.log('=== Filling Complete Form ===');

        //Initial Selections
        cy.log('Filling Initial Selections');
        this.fillInitialSelections(
            formData.facilityNameSelection,
            formData.housingCategory,
            formData.livingOption,
            formData.dateOfBirth
        );

        //Basic Information
        cy.log('Filling Basic Information');
        this.fillBasicInfo(
            formData.fullNames,
            formData.lastName,
            formData.id,
            formData.email,
            formData.phoneNumberOwn,
            formData.phoneNumberChild,
            formData.address,
            formData.postalCode
        );

        //Demographics
        cy.log('Filling Demographics');
        this.fillDemographics(
            formData.homeLanguage,
            formData.religion,
            formData.occupation
        );

        //Funeral Details
        cy.log('Filling Funeral Details');
        this.fillFuneralDetails(
            formData.name,
            formData.phoneNumber,
            formData.referenceNumber,
            formData.address1
        );

        // 5. Hospital Details
        cy.log('Filling Hospital Details');
        this.fillHospitalDetails(
            formData.hospitalName,
            formData.fileNumber
        );

        //Medical Fund
        cy.log('Filling Medical Fund');
        this.fillMedicalFund(
            formData.medicalFund,
            formData.planName,
            formData.medicalAidNumber,
            formData.doctorName,
            formData.doctorPhone
        );

        //Child Details
        cy.log('Filling Child Details');
        this.fillChildDetails(
            formData.childFullName,
            formData.childPhoneNo,
            formData.childCellNo,
            formData.childEmail,
            formData.childAddress,
            formData.childRelationship,
            formData.childOccupation
        );

        // 8. Medical Condition
        cy.log('Filling Medical Condition');
        this.fillMedicalCondition(
            formData.healthStatus,
            formData.medicalDiagnosis,
            formData.allergies
        );

        //Help Needed
        cy.log('Filling Help Needed');
        this.fillHelpNeeded(
            formData.needMobility,
            formData.mobilityDescription,
            formData.needBathing,
            formData.bathingDescription
        );

        //Financial Management
        cy.log('Filling Financial Management');
        this.fillFinancialManagement(
            formData.canDoFinancesMyself,
            formData.needFinancialHelp,
            formData.someoneManagesFinances
        );

        //Intake Timing
        cy.log('Filling Intake Timing');
        this.fillIntakeTiming(
            formData.intakeImmediately,
            formData.intakeWithin3Months,
            formData.intakeWithin6Months,
            formData.intakeLater
        );

        //Previous Care History
        cy.log('Filling Previous Care History');
        this.fillPreviousCareHistory(
            formData.previouslyTaken,
            formData.facilityName,
            formData.facilityContact,
            formData.leavingReason
        );

        //Declarations
        cy.log('Accepting Declarations');
        this.acceptDeclarations();

        //Signatures
        cy.log('Filling Signatures');
        this.fillSignatures(
            formData.applicantProxyName,
            formData.witnessName
        );

        // Submit Form
        cy.log('Submitting Form');
        this.submitForm(formData.sendCopyToEmail);

        cy.log('=== Complete Form Fill Finished ===');
    } 
    
}
