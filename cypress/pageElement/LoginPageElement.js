// ============================================
// LoginPageElement.js - Element Locators
// ============================================
// All login page element selectors based on actual Badisa login HTML
// ============================================

export class LoginPageElement {
    // ============================================
    // PAGE IDENTIFIERS
    // ============================================
    
    /** Welcome heading */
    welcomeHeading = 'h1:contains("Welcome to")';
    
    /** Badisa logo */
    badisaLogo = 'img[alt="Logo"]';
    logoImage = 'img[fetchpriority="high"]';
    
    // ============================================
    // FORM ELEMENTS
    // ============================================
    
    /** Email input field */
    emailInput = 'input[id="email"]';
    emailInputByName = 'input[name="email"]';
    emailInputByType = 'input[type="email"]';
    emailInputByAutocomplete = 'input[autocomplete="email"]';
    
    /** Email label */
    emailLabel = 'label[for="email"]';
    
    /** Password input field */
    passwordInput = 'input[id="password"]';
    passwordInputByName = 'input[name="password"]';
    passwordInputByType = 'input[type="password"]';
    
    /** Password label */
    passwordLabel = 'label[for="password"]';
    
    /** Toggle password visibility button (eye icon) */
    togglePasswordButton = 'button[aria-label="Toggle password visibility"]';
    togglePasswordIcon = 'button > svg.lucide-eye';
    
    // ============================================
    // FORM ACTIONS
    // ============================================
    
    /** Sign In button */
    signInButton = 'button[type="submit"]';
    signInButtonByText = 'button:contains("Sign In")';
    
    /** Forgot Password link */
    forgotPasswordLink = 'a[href="/en/auth/forgot-password"]';
    forgotPasswordText = 'a:contains("Forgot Password")';
    
    // ============================================
    // FORM VALIDATION
    // ============================================
    
    /** Required field indicators */
    requiredSpan = 'span.text-red-600';
    
    /** Error messages */
    errorMessage = '.error-message';
    errorAlert = '[role="alert"]';
    errorToast = '.toast-error';
    
    // ============================================
    // LOADING & DISABLED STATES
    // ============================================
    
    /** Disabled button state */
    disabledButton = 'button[disabled]';
    
    /** Loading spinner */
    loadingSpinner = '.spinner';
    
    // ============================================
    // FORM CONTAINER
    // ============================================
    
    /** Main form element */
    loginForm = 'form[class*="flex"][class*="w-full"]';
    autoPickForm = 'form[id^="autopick_"]';
}

// ============================================
// END OF FILE
// ============================================