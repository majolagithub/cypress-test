export class LoginPageElement {
    
    welcomeHeading = 'h1:contains("Welcome to")';
    
    badisaLogo = 'img[alt="Logo"]';
    logoImage = 'img[fetchpriority="high"]';
    
    emailInput = 'input[id="email"]';
    emailInputByName = 'input[name="email"]';
    emailInputByType = 'input[type="email"]';
    emailInputByAutocomplete = 'input[autocomplete="email"]';
    
    emailLabel = 'label[for="email"]';
    
    passwordInput = 'input[id="password"]';
    passwordInputByName = 'input[name="password"]';
    passwordInputByType = 'input[type="password"]';
    
    passwordLabel = 'label[for="password"]';
    
    togglePasswordButton = 'button[aria-label="Toggle password visibility"]';
    togglePasswordIcon = 'button > svg.lucide-eye';

    signInButton = 'button[type="submit"]';
    signInButtonByText = 'button:contains("Sign In")';
    
    forgotPasswordLink = 'a[href="/en/auth/forgot-password"]';
    forgotPasswordText = 'a:contains("Forgot Password")';
    requiredSpan = 'span.text-red-600';
    
    errorMessage = '.error-message';
    errorAlert = '[role="alert"]';
    errorToast = '.toast-error';
    
    disabledButton = 'button[disabled]';
    
    loadingSpinner = '.spinner';

    loginForm = 'form[class*="flex"][class*="w-full"]';
    autoPickForm = 'form[id^="autopick_"]';
}