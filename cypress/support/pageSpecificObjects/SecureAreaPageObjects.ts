export class SecureAreaPageObjects {
    
    static get pageTitle() {
        return cy.get('h2');
    }

    static get pageSubTitle() {
        return cy.get('h4.subheader');
    }

    static get logoutButton() {
        return cy.contains('Logout');
    }
    
}

export default SecureAreaPageObjects;