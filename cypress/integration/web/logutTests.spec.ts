/// <reference types="cypress" />

import BannerObjects from "../../support/generalObjects/bannerObjects";
import SecureAreaPageObjects from "../../support/pageSpecificObjects/SecureAreaPageObjects";


describe('Tests for Logging Out', () => {
    
    context('Verify that users are able to logout', () => {
        before(() => {
            cy.visit('/login')
            cy.login(Cypress.env('testUser').username, Cypress.env('testUser').password)
        });
        
        it('Should successfully logout the user and display a logout message', () => {
            validateLogoutButton();
            verifyThatUsersAreSuccessfullyRedirectedToLoginPageAfterLoggingOut();
            BannerObjects.successBanner.should('contains.text', 'You logged out of the secure area!')
        });
        
    });



    //------------------Helper Functions------------------------//
    function validateLogoutButton() {
        SecureAreaPageObjects.logoutButton.as('logoutButton')
        
        cy.get('@logoutButton').invoke('attr','href').should('eq','/logout')
        cy.get('@logoutButton').should('be.visible').and(($button) => {
            expect($button).to.contain.text('Logout')
            .and.to.have.css('background-color', 'rgb(233, 233, 233)')
            .and.to.have.css('border-color', 'rgb(208, 208, 208)')
            .and.to.have.css('color', 'rgb(51, 51, 51)')
        });
    }

    function verifyThatUsersAreSuccessfullyRedirectedToLoginPageAfterLoggingOut() {
        cy.intercept('**/login').as('login')
        SecureAreaPageObjects.logoutButton.click()
        cy.wait('@login')
        cy.url().should('eq','http://the-internet.herokuapp.com/login')
    }

});