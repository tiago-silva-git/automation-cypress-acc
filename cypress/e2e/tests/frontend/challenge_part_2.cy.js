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

    cy.get(locators.FORM.FIRST_NAME).type(faker.person.firstName());
    cy.get(locators.FORM.LAST_NAME).type(faker.person.lastName());
    cy.get(locators.FORM.EMAIL).type(faker.internet.email());
    cy.get(locators.FORM.GENDER_MALE).click();
    cy.get(locators.FORM.PHONE).type("9999999999");

    cy.get(locators.FORM.DOB_INPUT).click();
    cy.get(locators.FORM.DOB_YEAR_SELECT).select("1996");
    cy.get(locators.FORM.DOB_MONTH_SELECT).select("March");
    cy.get(locators.FORM.DOB_DAY).click();

    cy.get(locators.FORM.SUBJECTS_INPUT).type("Maths{enter}");

    cy.get(locators.FORM.HOBBY_SPORTS).click();

    cy.get(locators.FORM.UPLOAD_PICTURE).attachFile("note-test.txt");

    cy.get(locators.FORM.ADDRESS).type(faker.location.streetAddress());

    cy.get(locators.FORM.STATE_DROPDOWN).click();
    cy.get(locators.FORM.STATE_OPTION_NCR).click();

    cy.get(locators.FORM.CITY_DROPDOWN).click();
    cy.get(locators.FORM.CITY_OPTION_DELHI).click();

    cy.get(locators.FORM.SUBMIT_BTN).click();

    cy.get(locators.FORM.MODAL_TITLE)
      .should("be.visible")
      .and("contain", "Thanks for submitting the form");

    cy.get(locators.FORM.CLOSE_MODAL_BTN).click({ force: true });

    cy.get(locators.FORM.MODAL_TITLE).should("not.exist");
  });

  it("should open a new window and validate the message", () => {
    cy.contains(locators.HOME.ALERTS_MENU).click();

    cy.contains(locators.HOME.BROWSER_WINDOWS_MENU).click();

    cy.get(locators.BROWSER_WINDOWS.NEW_WINDOW_BTN).then(() => {
      // Go directly to the page that opens in the new window
      cy.visit("https://demoqa.com/sample");
    });

    cy.get(locators.BROWSER_WINDOWS.SAMPLE_HEADING)
      .should("be.visible")
      .and("contain.text", "This is a sample page");

    cy.go("back");

    // Validate that we returned to Browser Windows
    cy.url().should("include", "/browser-windows");
  });

  it("should create, edit and delete a record successfully", () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({ min: 18, max: 60 });
    const salary = faker.number.int({ min: 2000, max: 10000 });
    const department = faker.commerce.department();
    const newDepartment = faker.commerce.department();

    cy.contains(locators.HOME.ELEMENTS_MENU).click();

    cy.contains(locators.HOME.WEB_TABLES_MENU).click();

    cy.get(locators.WEB_TABLES.ADD_BTN).click();

    cy.get(locators.WEB_TABLES.FIRST_NAME).type(firstName);
    cy.get(locators.WEB_TABLES.LAST_NAME).type(lastName);
    cy.get(locators.WEB_TABLES.EMAIL).type(email);
    cy.get(locators.WEB_TABLES.AGE).type(age.toString());
    cy.get(locators.WEB_TABLES.SALARY).type(salary.toString());
    cy.get(locators.WEB_TABLES.DEPARTMENT).type(department);

    cy.get(locators.WEB_TABLES.SUBMIT_BTN).click();

    cy.contains(locators.WEB_TABLES.CELL, firstName).should("exist");

    cy.contains(locators.WEB_TABLES.CELL, firstName)
      .parent()
      .find(locators.WEB_TABLES.EDIT_BTN)
      .click({ force: true });

    cy.get(locators.WEB_TABLES.DEPARTMENT, { timeout: 6000 })
      .should("be.visible")
      .clear()
      .type(newDepartment);

    cy.get(locators.WEB_TABLES.SUBMIT_BTN).click();

    cy.contains(locators.WEB_TABLES.CELL, newDepartment).should("exist");

    cy.contains(locators.WEB_TABLES.CELL, firstName)
      .parent()
      .find(locators.WEB_TABLES.DELETE_BTN)
      .click();

    cy.contains(locators.WEB_TABLES.CELL, firstName).should("not.exist");
  });

  it("should control the progress bar: stop before 25% and complete to 100%", () => {
    cy.contains(locators.HOME.WIDGETS_MENU).click();
    cy.contains(locators.PROGRESS_BAR.PROGRESS_BAR_MENU).click();

    // --- Step 1: Start and stop before 25% ---
    cy.get(locators.PROGRESS_BAR.START_STOP_BTN).click();

    function stopBefore25() {
      cy.get(locators.PROGRESS_BAR.BAR_INNER)
        .invoke("attr", "aria-valuenow")
        .then((val) => {
          const progress = parseInt(val, 10);
          if (isNaN(progress) || progress < 1) {
            cy.wait(20).then(stopBefore25); // wait for the progress bar to start
          } else if (progress < 25) {
            cy.wait(10).then(stopBefore25); // continue until 25%
          } else {
            cy.get(locators.PROGRESS_BAR.START_STOP_BTN).click();
            cy.log(`Progress stopped at ${progress}% (before 25%)`);
          }
        });
    }

    stopBefore25();

    // --- Step 2: Start again until 100% and reset ---
    cy.get(locators.PROGRESS_BAR.START_STOP_BTN).click();

    function waitUntil100() {
      cy.get(locators.PROGRESS_BAR.BAR_INNER)
        .invoke("attr", locators.PROGRESS_BAR.VALUE_PROGRESS)
        .then((val) => {
          const progress = parseInt(val, 10);
          if (isNaN(progress) || progress < 100) {
            cy.wait(20).then(waitUntil100);
          } else {
            // Click reset when progress >= 100
            cy.get(locators.PROGRESS_BAR.RESET_BTN).click();
            cy.log("Progress reached 100% and reset clicked");
          }
        });
    }

    waitUntil100();

    // Validate that progress reset to 0
    cy.get(locators.PROGRESS_BAR.BAR_INNER)
      .invoke("attr", locators.PROGRESS_BAR.VALUE_PROGRESS)
      .should("eq", "0");
  });
});
