describe('Interacting with elements', () => {
    it('Should visit tge page', () => {
        cy.visit("/buttons");
    });

    it('Should click', () => {
        cy.get('button').eq(3).click();
        cy.get('#dynamicClickMessage').should('be.visible').and('contain', 'You have done a dynamic click');
    })
    it('Should double click', () => {
        cy.get('#doubleClickBtn').dblclick();
        cy.get('#doubleClickMessage').should('be.visible').and('contain', 'You have done a double click');
    })
    it('Should right click', () => {
        cy.get('#rightClickBtn').rightclick();
        cy.get('#rightClickMessage').should('be.visible').and('contain', 'You have done a right click');
    })
    it('Should click', () => {
        cy.get('button').eq(3).parent().parent().click('topRight');
        
    });

    
});