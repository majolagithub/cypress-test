// Contains methods that interact with the form page
import { FormPageElement } from "../pageElement/FormPageElement";

export class FormPage {
    element = new FormPageElement();

    // type into input field if empty
    enterTextField = (element, fieldValue) => {
        if (fieldValue === undefined || fieldValue === null) {
            throw new Error(`Field value is undefined for element: ${element}`);
        }    
        cy.get(element, { timeout: 100000 })
          .should('be.visible')
          .should('be.empty')
          .type(fieldValue);
    }

    // allows you to call enterFormFieldValue
    enterFormFieldValue = (element, fieldValue) => {
        this.enterTextField(element, fieldValue);
    }

    // click a radio or option
    selectOption = (optionSelector) => {
        cy.get(optionSelector, { timeout: 10000 })
          .should('be.visible')
          .click();
    }

    // check a checkbox
    checkCheckbox = (checkboxSelector) => {
        cy.get(checkboxSelector, { timeout: 10000 })
          .should('be.visible')
          .check({ force: true });
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
        this.enterFormFieldValue(this.element.fullNames, fullNames);
        this.enterFormFieldValue(this.element.lastName, lastName);
        this.enterFormFieldValue(this.element.idNumber, idNumber);
        this.enterFormFieldValue(this.element.emailAddress, email);
        this.enterFormFieldValue(this.element.phoneNumberOwn, phoneNumberOwn);
        //this.selectOption(this.element.applicationNew);
        this.enterFormFieldValue(this.element.phoneNumberChild, phoneNumberChild);
        this.enterFormFieldValue(this.element.address, address);
        this.enterFormFieldValue(this.element.postalCode, postalCode);
    }

    fillDemographics = (homeLanguage, religion, occupation) => {
        this.selectOption(this.element.genderFemale);
        this.selectOption(this.element.raceBlack);
        this.selectOption(this.element.maritalSingle);
        this.enterFormFieldValue(this.element.homeLanguage, homeLanguage);
        this.enterFormFieldValue(this.element.religion, religion);
        this.enterFormFieldValue(this.element.occupation, occupation);
    }

    fillFuneralDetails = (name, phoneNumber, referenceNumber, address1) => {
        this.enterFormFieldValue(this.element.name, name);
        this.enterFormFieldValue(this.element.phoneNumber, phoneNumber);
        this.enterFormFieldValue(this.element.referenceNumber, referenceNumber);
        this.enterFormFieldValue(this.element.address1, address1);
    }

    fillHospitalDetails = (hospitalName, fileNumber) => {
        this.enterFormFieldValue(this.element.hospitalName, hospitalName);
        if (fileNumber) {
            this.enterFormFieldValue(this.element.fileNumber, fileNumber);
        }
    }

    fillMedicalFund = (medicalFund, planName, aidNumber, doctorName, doctorPhone) => {
        this.enterFormFieldValue(this.element.nameOfMedicalFund, medicalFund);
        this.enterFormFieldValue(this.element.nameOfPlan, planName);
        this.enterFormFieldValue(this.element.medicalAidNumber, aidNumber);
        this.enterFormFieldValue(this.element.doctorName, doctorName);
        this.enterFormFieldValue(this.element.doctorPhoneNo, doctorPhone);
    }

    fillChildDetails = (fullName, phoneNo, cellNo, email, address, relationship, occupation) => {
        this.enterFormFieldValue(this.element.childFullName, fullName);
        this.enterFormFieldValue(this.element.childPhoneNo, phoneNo);
        this.enterFormFieldValue(this.element.childCellNo, cellNo);
        this.enterFormFieldValue(this.element.childEmail, email);
        this.enterFormFieldValue(this.element.childAddress, address);
        this.enterFormFieldValue(this.element.childRelationship, relationship);
        this.enterFormFieldValue(this.element.childOccupation, occupation);
    }

    fillMedicalCondition = (healthStatus, diagnosis, allergies) => {
        this.enterFormFieldValue(this.element.healthStatusTextarea, healthStatus);
        this.enterFormFieldValue(this.element.medicalDiagnosisTextarea, diagnosis);
        this.enterFormFieldValue(this.element.allergiesInput, allergies);
    }

    fillHelpNeeded = (needMobility, mobilityDesc, needBathing, bathingDesc) => {
        if (needMobility) {
            this.checkCheckbox(this.element.mobilityCheckbox);
            if (mobilityDesc) {
                this.enterFormFieldValue(this.element.mobilityDescribe, mobilityDesc);
            }
        }
        if (needBathing) {
            this.checkCheckbox(this.element.bathingCheckbox);
            if (bathingDesc) {
                this.enterFormFieldValue(this.element.bathingDescribe, bathingDesc);
            }
        }
    }

    fillFinancialManagement = (canDoMyself, needHelp, someoneManages) => {
        if (canDoMyself) {
            this.checkCheckbox(this.element.canDoItMyselfCheckbox);
        }
        if (needHelp) {
            this.checkCheckbox(this.element.needHelpCheckbox);
        }
        if (someoneManages) {
            this.checkCheckbox(this.element.someoneManagesCheckbox);
        }
    }

    fillIntakeTiming = (immediately, within3Months, within6Months, later) => {
        if (immediately) {
            this.checkCheckbox(this.element.immediatelyCheckbox);
        }
        if (within3Months) {
            this.checkCheckbox(this.element.within3MonthsCheckbox);
        }
        if (within6Months) {
            this.checkCheckbox(this.element.within6MonthsCheckbox);
        }
        if (later) {
            this.checkCheckbox(this.element.laterCheckbox);
        }
    }
}