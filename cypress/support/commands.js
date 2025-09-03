import 'cypress-file-upload';

Cypress.Commands.add("createUser", (username, password) => {
  return cy.request("POST", "/Account/v1/User", {
    userName: username,
    password: password,
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.userID).to.exist;

    return response.body.userID; // returns the userId to be used in tests
  });
});