Cypress.Commands.add('newUser', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/Account/v1/User',
        body: {
            "userName": user,
            "password": password,
            "redirecionar":false
        }
    }).its('body.userID').should('not.be.empty').then(userID => {
        Cypress.env('userID', userID) 
        return userID
    })
})