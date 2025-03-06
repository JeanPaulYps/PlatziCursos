describe('Input tests', () => {
    it('Should visit the page', () => {
        cy.visit('/automation-practice-form');
    });
    it.skip('Should type', () => {
        cy.get('#firstName').type('javier');
        cy.get('#lastName').type('Fuentes');
        cy.get("#firstName").type("{selectAll}{backspace}");
        cy.get("#firstName").type("otro nombre");
        cy.get("#firstName").clear();
    });

    it.skip('Should use checkbox', () => {
        // cy.get('#gender-radio-1').check();
        cy.get('label[for="gender-radio-1"]').click();
        cy.get('label[for="hobbies-checkbox-1"]').click();
        cy.get('label').contains('Reading').click()
    })

    it.skip('Should extract info', () => {
        cy.get('#firstName').as('name');
        cy.get("@name").type('Javier');
        cy.get("@name").then(name => {
            expect(name.val()).to.equal('Javier');
        })
    })
    
    it('Working with dropdowns', () => {
        cy.get('#state').click();
        cy.get('#state').get('[id^="react-select"]').contains('NCR').click()
    })
});