Cypress.Commands.add('authenticate',(username,password)=>{
    cy.request({
        method: 'POST',
        body:{
            username: username,
            password: password
        },
        url: Cypress.env('baseServiceUrl') + 'authenticate',
        failOnStatusCode: false
    });
});