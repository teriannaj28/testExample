Cypress.Commands.add('authenticate', (username, password) => {
   return cy.request({
        method: 'POST',
        body: {
            username: username,
            password: password
        },
        url: Cypress.env('baseServicesUrl') + 'authenticate',
        failOnStatusCode: false
    });
});