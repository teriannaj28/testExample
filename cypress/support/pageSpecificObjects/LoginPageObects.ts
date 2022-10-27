export class LoginPageObjects {
    static get usernameInputField() {
        return cy.get('#username')
    }

    static get passwordInputField() {
        return cy.get('#password')
    }

    static get submitButton() {
        return cy.get('button[type="submit"]')
    }

    static get pageTitle() {
        return cy.get('.example h2')
    }

    static get pageSubheader() {
        return cy.get('.example h4.subheader')
    }

}

export default LoginPageObjects;