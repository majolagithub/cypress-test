
//This test verifies that the form can be filled successfully using Page Object Model (POM).

import { FormPage } from '../pageMethod/FormPage';
import { HomePage } from '../pageMethod/HomePage';

const homePage = new HomePage();
const formPage = new FormPage();

describe('Form Submission Test', () => {
    let formData;

    //Load fixture data before tests run
    before(() => {
        cy.fixture('formData').then((data) => {
            formData = data;
        })
    })

    it('Fills out the form using data from fixture', () => {
        homePage.visitHomePage();
        homePage.visitWaitingListFormPage();

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

        formPage.fillDemographics(
            formData.homeLanguage,
            formData.religion,
            formData.occupation
        );

        formPage.fillFuneralDetails(
            formData.name,
            formData.phoneNumber,
            formData.referenceNumber,
            formData.address1
        );

        formPage.fillHospitalDetails(formData.hospitalName, formData.fileNumber);
        formPage.fillMedicalFund(
            formData.medicalFund,
            formData.planName,
            formData.medicalAidNumber,
            formData.doctorName,
            formData.doctorPhone
        );

        formPage.fillChildDetails(
            formData.childFullName,
            formData.childPhoneNo,
            formData.childCellNo,
            formData.childEmail,
            formData.childAddress,
            formData.childRelationship,
            formData.childOccupation
        );

        formPage.fillMedicalCondition(
            formData.healthStatus,
            formData.medicalDiagnosis,
            formData.allergies
        );

        formPage.fillHelpNeeded(
            formData.needMobility,
            formData.mobilityDescription,
            formData.needBathing,
            formData.bathingDescription
        );

        formPage.fillFinancialManagement(
            formData.canDoFinancesMyself,
            formData.needFinancialHelp,
            formData.someoneManagesFinances
        );

        formPage.fillIntakeTiming(
            formData.intakeImmediately,
            formData.intakeWithin3Months,
            formData.intakeWithin6Months,
            formData.intakeLater
        );
    })
})