//This is a short example of the ability of api testing for the application

describe('Tests for Login service', ()=>{
    context('Verify that unauthorized users are unable to login',() => {
        it('Should return an error when endpoint is called with an incorrect username',() => {
            /*
            This is just an example --this test will fail because this endpoint authenticates 
            using a third pary authenticator & redirects the user
            */
            cy.authenticate('wrong^&username',Cypress.env('testUser').password).then((response:any)=>{
                expect(response.body).to.contain('User unauthorized');
            });
        });
    });
});