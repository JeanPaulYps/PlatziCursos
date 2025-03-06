
describe('Saving elements', () => {
    it('Repetittion ', () => {
        cy.visit('/automation-practice-form');
        cy.get('input[placeholder="First Name"]').parent();
        
        cy.get('input[placeholder="First Name"]').parents();
        cy.get('input[placeholder="First Name"]').parents().find('label');
        cy.get('form').find('label');
    });

    it("Prevent repetition", () => {
        cy
            .get('input[placeholder="First Name"]')
            .parents('form')
            .then(form => {
                const inputs = form.find('input');
                const divs = form.find('div');
                const labels = form.find('label')

                expect(inputs.length).to.eq(15);
                expect(divs.length).to.eq(70);
                expect(labels.length).to.eq(16);

                cy.wrap(inputs).should('have.length', 15);
            })
            ;

    })
});