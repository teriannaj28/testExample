Cypress.Commands.add('login',(username,password)=>{
    cy.get('[id="username').type(username);
    cy.get('[id="password"]').type(password);
    cy.get('button[type="submit"]').click()
})