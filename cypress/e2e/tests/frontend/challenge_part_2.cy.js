/// <reference types="cypress" />
import locators from "../../../support/locators";

import { faker } from "@faker-js/faker";

describe("Fill out the DemoQA form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill out and submit the form successfully", () => {
    cy.contains(locators.HOME.FORMS_MENU).click();
    cy.contains(locators.HOME.PRACTICE_FORM).click();

    // Fill basic fields
    cy.get(locators.FORM.FIRST_NAME).type(faker.person.firstName());
    cy.get(locators.FORM.LAST_NAME).type(faker.person.lastName());
    cy.get(locators.FORM.EMAIL).type(faker.internet.email());
    cy.get(locators.FORM.GENDER_MALE).click();
    cy.get(locators.FORM.PHONE).type("9999999999");

    // Date of birth
    cy.get(locators.FORM.DOB_INPUT).click();
    cy.get(locators.FORM.DOB_YEAR_SELECT).select("1996");
    cy.get(locators.FORM.DOB_MONTH_SELECT).select("March");
    cy.get(locators.FORM.DOB_DAY).click();

    // Subject
    cy.get(locators.FORM.SUBJECTS_INPUT).type("Maths{enter}");

    // Hobbies
    cy.get(locators.FORM.HOBBY_SPORTS).click();

    // Upload
    cy.get(locators.FORM.UPLOAD_PICTURE).attachFile("note-test.txt");

    // Address
    cy.get(locators.FORM.ADDRESS).type(faker.location.streetAddress());

    // State and city
    cy.get(locators.FORM.STATE_DROPDOWN).click();
    cy.get(locators.FORM.STATE_OPTION_NCR).click();

    cy.get(locators.FORM.CITY_DROPDOWN).click();
    cy.get(locators.FORM.CITY_OPTION_DELHI).click();

    // Submit
    cy.get(locators.FORM.SUBMIT_BTN).click();

    // Validate modal
    cy.get(locators.FORM.MODAL_TITLE)
      .should("be.visible")
      .and("contain", "Thanks for submitting the form");

    cy.get(locators.FORM.CLOSE_MODAL_BTN).click({ force: true });

    cy.get(locators.FORM.MODAL_TITLE).should("not.exist");
  });

  it("should open a new window and validate the message", () => {
    // Access menu Alerts, Frame & Windows
    cy.contains(locators.HOME.ALERTS_MENU).click();

    // Submenu Browser Windows
    cy.contains(locators.HOME.BROWSER_WINDOWS_MENU).click();

    // Intercept the "New Window" button
    cy.get(locators.BROWSER_WINDOWS.NEW_WINDOW_BTN).then(() => {
      // Go directly to the page that opens in the new window
      cy.visit("https://demoqa.com/sample");
    });

    // Validate the message
    cy.get(locators.BROWSER_WINDOWS.SAMPLE_HEADING)
      .should("be.visible")
      .and("contain.text", "This is a sample page");

    // "Close the new window" = go back to the previous page
    cy.go("back");

    // Validate that we returned to Browser Windows
    cy.url().should("include", "/browser-windows");
  });
});
