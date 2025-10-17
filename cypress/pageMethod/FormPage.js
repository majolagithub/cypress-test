// Contains methods that interact with the form page
import { FormPageElement } from "../pageElement/FormPageElement";

export class FormPage {
    element = new FormPageElement();

    selectFacilityByName = (facilityName) => {
        cy.log(`Selecting facility: ${facilityName}`);
        cy.get(this.element.selectFacilityDropdown, { timeout: 10000 })
          .should('be.visible')
          .click();

        cy.contains('option', facilityName, { timeout: 10000 })
          .should('be.visible')
          .click();

        cy.log(`Selected facility: ${facilityName}`);
    }

    selectHousingCategory = (category) => {
        cy.log(`Selecting housing category: ${category}`);
        cy.get(this.element.selectHousingCategoryButton, { timeout: 10000 })
          .should('be.visible')
          .click();

        cy.get(`option[value="${category}"]`, { timeout: 10000 })
          .parent('select')
          .select(category);

        cy.log(`Selected housing category: ${category}`);
    }

    selectLivingOptionByValue = (option) => {
        cy.log(`Selecting living option: ${option}`);
        cy.get(this.element.selectLivingOptionButton, { timeout: 10000 })
          .should('be.visible')
          .click();

        cy.get(`option[value="${option}"]`, { timeout: 10000 })
          .parent('select')
          .select(option);

        cy.log(`Selected living option: ${option}`);
    }

    setDateOfBirth = (dateString) => {
        cy.log(`Setting date of birth: ${dateString}`);
        cy.get(this.element.dateOfBirthButton, { timeout: 10000 })
          .should('be.visible')
          .click();

        cy.wait(500);
        //for typing directly:
        // cy.get(this.element.dateOfBirthInput).type(dateString);
        cy.log(`✅ Date of birth set`);
    }

    fillInitialSelections = (facilityName, housingCategory, livingOption, dateOfBirth) => {
        cy.log('=== Filling Initial Form Selections ===');

        if (facilityName) this.selectFacilityByName(facilityName);
        if (housingCategory) this.selectHousingCategory(housingCategory);
        if (livingOption) this.selectLivingOptionByValue(livingOption);
        if (dateOfBirth) this.setDateOfBirth(dateOfBirth);

        cy.log('✅ Initial selections complete');
    }

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
}
