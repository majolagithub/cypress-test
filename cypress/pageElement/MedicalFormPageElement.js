export class MedicalFormPageElement {
    
    /** Medical Form title */
    medicalFormTitle = 'span:contains("Medical Form")';
    
    /** Form completion status */
    formCompletionStatus = 'span:contains("To be completed by your doctor")';
    
    /** Menu button (hamburger menu) */
    menuButton = 'button[data-sidebar="menu-button"]';
    
    /** Doctor Name input */
    doctorName = 'input[name="doctorName"]';
    doctorNameInput = 'input[placeholder="Enter doctor name"]';
    
    /** Doctor Email ID input */
    doctorEmail = 'input[name="doctorEmail"]';
    doctorEmailInput = 'input[placeholder="Enter doctor official email id"]';
    
    /** Contact Number input */
    contactNumber = 'input[name="contactNumber"]';
    contactNumberInput = 'input[placeholder="Enter contact number"]';
    
    /** Clinic Name input */
    clinicName = 'input[name="clinicName"]';
    clinicNameInput = 'input[placeholder="Enter clinic name"]';

    /** Doctor Name label */
    doctorNameLabel = 'label:contains("Doctor Name")';
    
    /** Doctor Email ID label */
    doctorEmailLabel = 'label:contains("Doctor Email ID")';
    
    /** Contact Number label */
    contactNumberLabel = 'label:contains("Contact Number")';
    
    /** Clinic Name label */
    clinicNameLabel = 'label:contains("Clinic Name")';
    
    /** Required field indicators (red asterisks) */
    requiredFieldIndicator = 'span.text-red-600';
    
    /** Send Request button */
    sendRequestButton = 'button:contains("Send Request")';
    submitButton = 'button[type="submit"]';
    
    /** Collapsible section for doctor details */
    accordionSection = 'div[data-state="open"]';
    accordionTrigger = 'button[aria-labelledby*="radix"]';
    
    /** Error messages */
    errorMessage = '.error-message';
    fieldError = 'span[role="alert"]';
    toastError = '.toast-error';
    
    /** Success toast/notification */
    successMessage = '.toast-success';
    successNotification = '[role="status"]';
}

