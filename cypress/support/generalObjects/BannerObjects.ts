export class BannerObjects {

    static get errorBanner() {
        return cy.get('.error');
    }

    static get successBanner() {
        return cy.get('.success');
    }
    
}

export default BannerObjects;