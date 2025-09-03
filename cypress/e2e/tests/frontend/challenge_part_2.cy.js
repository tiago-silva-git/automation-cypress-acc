/// <reference types="cypress" />
import locators from "../../../support/locators";

import { faker } from "@faker-js/faker";

describe("Fill out the DemoQA form", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
  });

  it("Should fill out and submit the form successfully", () => {
    cy.contains(locators.HOME.FORMS_MENU).click();
    cy.contains(locators.HOME.PRACTICE_FORM).click();

    // Preencher campos básicos
    cy.get(locators.FORM.FIRST_NAME).type(faker.person.firstName());
    cy.get(locators.FORM.LAST_NAME).type(faker.person.lastName());
    cy.get(locators.FORM.EMAIL).type(faker.internet.email());
    cy.get(locators.FORM.GENDER_MALE).click();
    cy.get(locators.FORM.PHONE).type("9999999999");

    // Data de nascimento
    cy.get(locators.FORM.DOB_INPUT).click();
    cy.get(locators.FORM.DOB_YEAR_SELECT).select("1996");
    cy.get(locators.FORM.DOB_MONTH_SELECT).select("March");
    cy.get(locators.FORM.DOB_DAY).click();

    // Assunto
    cy.get(locators.FORM.SUBJECTS_INPUT).type("Maths{enter}");

    // Hobbies
    cy.get(locators.FORM.HOBBY_SPORTS).click();

    // Upload
    cy.get(locators.FORM.UPLOAD_PICTURE).attachFile("note-test.txt");

    // Endereço
    cy.get(locators.FORM.ADDRESS).type(faker.location.streetAddress());

    // Estado e cidade
    cy.get(locators.FORM.STATE_DROPDOWN).click();
    cy.get(locators.FORM.STATE_OPTION_NCR).click();

    cy.get(locators.FORM.CITY_DROPDOWN).click();
    cy.get(locators.FORM.CITY_OPTION_DELHI).click();

    // Submeter
    cy.get(locators.FORM.SUBMIT_BTN).click();

    // Validar modal
    cy.get(locators.FORM.MODAL_TITLE)
      .should("be.visible")
      .and("contain", "Thanks for submitting the form");

    cy.get(locators.FORM.CLOSE_MODAL_BTN).click({ force: true });

    cy.get(locators.FORM.MODAL_TITLE).should("not.exist");
  });
});
