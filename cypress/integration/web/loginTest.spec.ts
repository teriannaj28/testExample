/// <reference types="cypress" />

//If this application had different roles (e.g. "Admin") for users, each user's login experience would be tested.

import BannerObjects from "../../support/generalObjects/bannerObjects"
import LoginPageObjects from "../../support/pageSpecificObjects/LoginPageObects"

describe('Tests for Login Functionality', () => {
    beforeEach(() => {
        cy.visit('/login')
    });

    context('Verify that unauthorized users are unabe to login', () => {
        const loginCombinations = [['wrongUsername$', Cypress.env('testUser').password],
        [Cypress.env('testUser').username, 'jfsk&^%$lfj'], ['wrong%username', 'wrongPassword']]

        //Dynamically generates tests based on array of login combinations defined above.
        loginCombinations.forEach((combination, index) => {
            let loginType
            switch (index + 1) {
                case 1:
                    loginType = 'an invalid username'
                    break
                case 2:
                    loginType = 'an invalid password'
                    break
                case 3:
                    loginType = 'both an invalid usesrname and password'
                    break
            }

            it(`Should return an error when a user attempts to login with ${loginType}`, () => {
                cy.login(combination[0], combination[1])
                    .then(() => {
                        let message = (loginType === 'an invalid password') ? 'Your password is invalid!' : 'Your username is invalid!'
                        verifyRedBannerAppearsAndTextIsVisible()
                        BannerObjects.errorBanner.should('contain.text', message)
                    });
            });
        });

        it('Should return an error when the user leaves both input boxes blank', () => {
            LoginPageObjects.submitButton.click()
            BannerObjects.errorBanner.should('contain.text', 'Your username is invalid!')
        });
    });

    context('Verify that authorized users are able to successfully login', () => {
        it('Should successfully authenticate user', () => {
            cy.intercept('**/secure').as('securePage')

            cy.login(Cypress.env('testUser').username, Cypress.env('testUser').password)
            cy.wait('@securePage')
            cy.url().should('eq', 'http://the-internet.herokuapp.com/secure')

            BannerObjects.successBanner.should('contain.text', 'You logged into a secure area!')
            verifyGreenBannerAppearsAndTextIsVisible()
        });
    });

    context('Verify that Login Page is displayed correctly', () => {
        it('Should display heading, subheading, and form correctly', () => {
            LoginPageObjects.pageTitle.should('contain.text', 'Login Page')
            LoginPageObjects.pageSubheader.should('contain.text', 'This is where you can log into the secure area.' +
                ' Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.')

            validateLoginFormElements()
        });
    });



    //------------------Helper Functions------------------------//
    function verifyRedBannerAppearsAndTextIsVisible() {
        BannerObjects.errorBanner.should('be.visible').and($banner => {
            expect($banner).to.have.css('background-color', 'rgb(198, 15, 19)')
                .and.css('border-color', 'rgb(151, 11, 14)')
                .and.css('color', 'rgb(255, 255, 255)')
        });
    }

    function verifyGreenBannerAppearsAndTextIsVisible() {
        BannerObjects.successBanner.should('be.visible').and($banner => {
            expect($banner).to.have.css('background-color', 'rgb(93, 164, 35)')
                .and.css('border-color', 'rgb(69, 122, 26)')
                .and.css('color', 'rgb(255, 255, 255)')
        });
    }

    function validateLoginFormElements() {
        LoginPageObjects.usernameInputField.as('username')
        LoginPageObjects.passwordInputField.as('password')

        cy.get('@username').siblings('label').should('have.text', 'Username')
        cy.get('@username').invoke('attr', 'type').should('eq', 'text')
        cy.get('@password').siblings('label').should('have.text', 'Password')
        cy.get('@password').invoke('attr', 'type').should('eq', 'password')

        LoginPageObjects.submitButton.should('be.visible').and(($button) => {
            expect($button).to.contain.text('Login')
                .and.have.css('background-color', 'rgb(43, 166, 203)')
                .and.have.css('border-color', 'rgb(34, 132, 161)')
                .and.have.css('color', 'rgb(255, 255, 255)')
        });

        LoginPageObjects.submitButton.find('.fa-sign-in').within(($el) => {
            cy.getPsuedoAttribute($el, 'before', 'content').should('contain', '""') //validates checkmark
        });
    }

});
