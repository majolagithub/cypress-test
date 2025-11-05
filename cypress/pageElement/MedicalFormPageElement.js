export class MedicalFormPageElement {
    
    medicalFormTitle = 'span:contains("Medical Form")';
    
    formCompletionStatus = 'span:contains("To be completed by your doctor")';
    
    menuButton = 'button[data-sidebar="menu-button"]';
    
    doctorName = 'input[name="doctorName"]';
    doctorNameInput = 'input[placeholder="Enter doctor name"]';
    
    doctorEmail = 'input[name="doctorEmail"]';
    doctorEmailInput = 'input[placeholder="Enter doctor official email id"]';
    
    contactNumber = 'input[name="contactNumber"]';
    contactNumberInput = 'input[placeholder="Enter contact number"]';
    
    clinicName = 'input[name="clinicName"]';
    clinicNameInput = 'input[placeholder="Enter clinic name"]';

    doctorNameLabel = 'label:contains("Doctor Name")';
    
    doctorEmailLabel = 'label:contains("Doctor Email ID")';
    
    contactNumberLabel = 'label:contains("Contact Number")';
    
    clinicNameLabel = 'label:contains("Clinic Name")';
    
    requiredFieldIndicator = 'span.text-red-600';
    
    sendRequestButton = 'button:contains("Send Request")';
    submitButton = 'button[type="submit"]';
    
    accordionSection = 'div[data-state="open"]';
    accordionTrigger = 'button[aria-labelledby*="radix"]';
    
    errorMessage = '.error-message';
    fieldError = 'span[role="alert"]';
    toastError = '.toast-error';
    
    successMessage = '.toast-success';
    successNotification = '[role="status"]';
}

