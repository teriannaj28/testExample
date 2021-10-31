//This is an example of api testing for the application

describe('Tests for Login service', ()=>{
    context('Verify that unauthorized users are unable to login',()=>{
        it('Should return an error when endpoint is called with an incorrect username',()=>{
            cy.authenticate('wrong^&username',Cypress.env('testUser').password).then((response:any)=>{
                expect(response.body).to.contain('User unauthorized');
            });
        });
    });
});