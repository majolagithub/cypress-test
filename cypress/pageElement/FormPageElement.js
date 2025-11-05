export class FormPageElement {
    // selectFacilityDropdown = 'button[role="combobox"]:contains("Select preferred facility")';
    // selectFacilityDropdownFirst = 'button[role="combobox"]';
    // selectHousingCategoryButton = 'button[role="combobox"]:contains("Choose category")';
    // selectLivingOptionButton = 'button[role="combobox"]:contains("Choose living preference")';
    // dateOfBirthButton = 'button[aria-haspopup="dialog"]';


    // selectPreferredFacility = '.max-w-3xl > :nth-child(1) > .flex';
    // selectFaciliyName = '.max-w-3xl > :nth-child(1) > .font-medium';
    // selectHousingCategory = '.max-w-3xl > .flex-col > :nth-child(1) > .flex';
    // selectLivingOption = '.max-w-3xl > .flex-col > :nth-child(2) > .flex';
    // dateOfBirth = ':nth-child(1) > .inline-flex';


    fullNames = '#fullNames';
    lastName = '#lastName';
    dateOfBirth = ':nth-child(1) > .inline-flex';
    idNumberType = '.sm\\:flex-row > :nth-child(1) > .flex';
    idNumber = '#saId';
    emailAddress = '#email';
    phoneNumberOwn = '#phoneOwn';
    phoneNumberChild = '#phoneChild';
    address = '#address';
    postalCode = '#areaCode';

    typeOfApplication = '.space-y-10 > :nth-child(2) > :nth-child(4) > :nth-child(1)';
    applicationNew = '[aria-labelledby*="radix-"]';
    applicationRenewal = '[aria-labelledby*="radix-"]';

    genderMale = '#gender-male';
    genderFemale = '#gender-female';
    gender = '.space-y-10 > :nth-child(3) > :nth-child(1) > :nth-child(1)';

    raceColored = '#race-colored';
    raceIndian = '#race-indian';
    raceBlack = '#race-black';
    raceWhite = '#race-white';

    maritalMarried = '#marital-married';
    maritalSingle = '#marital-single';
    maritalDivorced = '#marital-divorced';
    maritalWidowed = '#marital-widowed';
    maritalSeparated = '#marital-separated';
    maritalOtherPrefernottosay = '#marital-OtherPrefernottosay';

    homeLanguage = '#homeLanguage';
    religion = '#churchInvolvement';
    occupation = '#currentWork';

    name = '#funeralPersonName';
    phoneNumber = '#funeralPersonPhone';
    referenceNumber = '#funeralReferenceNo';
    address1 = '#funeralAddress';

    hospitalName = '#hospitalName';
    fileNumber = '#hospitalFileNo';
    nameOfMedicalFund = '#medicalFundName';
    nameOfPlan = '#medicalPlanName';
    medicalAidNumber = '#medicalAidNumber';
    doctorName = '#doctorName';
    doctorPhoneNo = '#doctorPhone';

    childFullName = '[name="children.0.fullName"]';
    childPhoneNo = '[name="children.0.phoneNo"]';
    childCellNo = '[name="children.0.cellNo"]';
    childEmail = '[name="children.0.email"]';
    childAddress = '[name="children.0.address"]';
    childRelationship = '[name="children.0.relationship"]';
    childOccupation = '[name="children.0.occupation"]';
    addMoreChildrenBtn = ':nth-child(4) > .inline-flex';

    healthStatusTextarea = '#healthStatus';
    medicalDiagnosisTextarea = '#medicalDiagnosis';
    allergiesInput = '#allergies';

    mobilityCheckbox = ':nth-child(1) > .space-x-2 > .peer';
    bathingCheckbox = '.space-y-4 > :nth-child(2) > .items-center > .peer';
    mobilityDescribe = '[name="mobilityDescribe"]';
    bathingDescribe = '[name="bathingDescribe"]';

    canDoItMyselfCheckbox = '#finance-myself';
    needHelpCheckbox = '#finance-help';
    someoneManagesCheckbox = '#finance-managed';

    immediatelyCheckbox = '#intake-immediately';
    within3MonthsCheckbox = '#intake-3months';
    within6MonthsCheckbox = '#intake-6months';
    laterCheckbox = '#intake-later';

    previouslyTakenYes = '#prev-yes';
    previouslyTakenNo = '#prev-no';
    facilityName = 'input[name="facilityName"]';
    facilityContact = 'input[placeholder="Facility Contact"]';
    leavingReason = 'textarea[placeholder="Explain what the reasons are for leaving the facility"]';

    declarationTruthCheckbox = '#decl-5';
    declarationHouseRulesCheckbox = 'button[id^="decl-"]:eq(1)';
    declarationPrivacyCheckbox = 'button[id^="decl-"]:eq(2)';
    declarationPopiaCheckbox = 'button[id^="decl-"]:eq(3)';
    declarationCookiesCheckbox = 'button[id^="decl-"]:eq(4)';

    applicantProxyName = '#applicantName';
    witnessName = '#witnessName';
    applicantDate = 'input[name="applicantDate"]';
    witnessDate = 'input[name="witnessDate"]';
    sendCopyCheckbox = '#sendCopy';
    submitButton = 'button[type="submit"]:contains("Submit")';
}
