describe('Assertions', () => {

    it('Should show page', () => {
        cy.intercept('https://mug.criteo.com/',{} );
        cy.visit('/automation-practice-form');
    })

    it('Should assert', () => {
        cy.url().should('include', 'demoqa.com');
        cy.get('#firstName').should('be.visible').should('have.attr', 'placeholder', 'First Name');
    });
    
    it('Should assert 2', () => {
        cy.get('#firstName').then(element => {
            expect(element).to.be.visible;
            expect(element).to.have.attr('placeholder', 'First Name');
        })
    });
    it('Should assert 3', () => {
        cy.get('#firstName').then(element => {
            assert.equal(element.attr('placeholder'), 'First Name')
        })
    });

    it('Should assert 4', async () => {
        const firstName = await cy.get('#firstName');
        expect(firstName).to.be.visible;

    })
});