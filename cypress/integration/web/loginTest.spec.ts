//If this application had different roles (e.g. "Admin") for users, each user's login experience would be tested.

describe('Tests for Login Functionality',()=>{
    before(()=>{
        cy.visit('/');
        cy.get(':nth-child(21) > a').click();
    });
    context('Verify that unauthorized users are unabe to login', () => {
        it('Should return an error when a user attempts to login with an invalid username', ()=>{
            cy.login('wrongUsername$',Cypress.env('testUser').password).then(()=>{
                cy.get('[id="flash"').should('contain.text','Your username is invalid');
                verifyRedBannerAppears();
            });
        });
        it('Should return an error when a user attempts to login with an invalid password', ()=>{
            cy.login(Cypress.env('testUser').username,'jfsklfj').then(()=>{
                cy.get('[id="flash"').should('contain.text','Your password is invalid');
                verifyRedBannerAppears();
            });
        });
        it('Should return an error when both username and password are invalid', ()=>{
            cy.login('wrong%Username','wrongPassword').then(()=>{
                cy.get('[id="flash"').should('contain.text','Your username is invalid');
                verifyRedBannerAppears();
            });
        })
    });

    context('Verify that authorized users are able to successfully login', ()=>{
        after(()=>{
            cy.get('[class="button secondary radius"]').click();
        });
        it('Should successfully authenticate user and properly display homepage',()=>{
            cy.login(Cypress.env('testUser').username,Cypress.env('testUser').password).then(()=>{
                cy.url().should('eq','http://the-internet.herokuapp.com/secure');
                cy.url().should('include','/secure');
                cy.get('[id="flash"]').should('contain.text','You logged into a secure area!');
                //Verify green banner and headers appear
                cy.get('[id="flash"').invoke('attr', 'class').should('eq', 'flash success');
                cy.get('[class="subheader"]').should('contain.text','Welcome to the Secure Area. When you are done click logout below.');
                cy.get('h2').should('contain.text','Secure Area');
            })
        });
        it('Should display a logout method for user',()=>{
            cy.get('[class="button secondary radius"]').invoke('attr','href').should('eq','/logout');
            cy.get('[class="icon-2x icon-signout"]').should('contain.text','Logout');   
        });
    });
    context('Verify that users are able to logout',()=>{
        beforeEach(()=>{
            cy.login(Cypress.env('testUser').username,Cypress.env('testUser').password);
            cy.get('[class="button secondary radius"]').as('logoutButton');
        });
        it('Should successfully logout user',()=>{
            cy.get('@logoutButton').click();
            cy.url().should('eq','http://the-internet.herokuapp.com/login');
            cy.url().should('include','/login');
        });
        it('Should dipslay logout message to user',()=>{
            cy.get('@logoutButton').click();
            cy.get('[id="flash"]').should('contain.text','You logged out of the secure area!');
            //Verify green banner appears
            cy.get('[class="flash success"]').should('exist');
        });
    });
});



function verifyRedBannerAppears(){
    cy.get('[class="flash error"]').should('exist');
}