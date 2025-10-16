# Cypress Test Guide (Page Object Model)

This guide will help you understand how to write and organize Cypress tests using **Page Object Model (POM)**.

---

## Folder Structure

cypress/
├─ e2e/ → Test files
│ └─ formTest.cy.ts
├─ fixtures/ → Test data
│ └─ formData.json
├─ pageElements/ → Selectors for each page
│ ├─ FormPageElements.ts
│ └─ HomePageElements.ts
└─ pageMethods/ → Actions for each page
├─ FormPage.ts
└─ HomePage.ts

---

## Page Object Model (POM) Concept

**Page Elements:**  
All CSS selectors for a page (so you never repeat them).

**Page Methods:**  
Actions and reusable logic using those selectors.

**Tests:**  
Call methods instead of writing direct Cypress commands in tests.

---

## How to Run Tests

1. Install dependencies  
   ```bash
   npm install
   ```

## Open Cypress GUI
    ```bash
    npx cypress open 
    ```

## Run all tests in headless mode
    ```bash
    npx cypress run
    ```

# Notes & Tips

Always put page selectors in pageElements/.
Put page actions (like fillFormData()) in pageMethods/.
Use fixtures for test data — easier to update.
Keep test names and methods descriptive.
Use cy.log() if you want to add comments in the Cypress runner.