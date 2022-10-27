import LoginPageObjects from "../../pageSpecificObjects/LoginPageObects";

Cypress.Commands.add('login',(username,password)=>{
    LoginPageObjects.usernameInputField.type(username)
    LoginPageObjects.passwordInputField.type(password)
    LoginPageObjects.submitButton.click()
});

Cypress.Commands.add('getPsuedoAttribute', (el, psuedoAttribute, propertyVal) => {
    cy.window().then(($win) => {
        const attribute = $win.getComputedStyle(el[0], psuedoAttribute)
        const val = attribute.getPropertyValue(propertyVal)
        return val
    });
});