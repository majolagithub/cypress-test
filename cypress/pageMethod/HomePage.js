import { HomePageElement } from "../pageElement/HomePageElement";

export class HomePage {
  
    element = new HomePageElement()

    //visit homepage
    visitHomePage = () => {
        cy.visit('/');
    }

    //Navigate to waiting list form
    visitWaitingListFormPage = () => {
        cy.get(this.element.joinWaitListBtn).click();
    }
}