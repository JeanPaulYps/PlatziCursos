describe('Waiting', () => {
    beforeEach(() => {
        cy.visit('https://www.platzi.com')
    });
    it('should visit the page', () => {
        cy.wait(5000)
    });

    it('Should wait for an element', () => {
        cy.get('.PublicHeader_publicHeader_ctaLogin__pO__W', {timeout: 6000})
    });
    
    it('Should wait for an element and assert', () => {
        cy
            .get('.PublicHeader_publicHeader_ctaLogin__pO__W', {timeout: 6000})
            .should('be.visible');
    });

    it('Should disable retry', () => {
        cy
        .get('.PublicHeader_publicHeader_ctaLogin__pO__W', {timeout: 0})
        .should('be.visible');
    })
});