import LoginPageObjects from "../../pageSpecificObjects/LoginPageObects";

Cypress.Commands.add('login',(username,password)=>{
    LoginPageObjects.usernameInputField.type(username);
    LoginPageObjects.passwordInputField.type(password);
    LoginPageObjects.submitButton.click();
})