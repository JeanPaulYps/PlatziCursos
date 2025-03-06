describe('Tooltip test', () => {

    before(() => {
        cy.visit("/tool-tips")
    })
    it('Should open the tooltip', () => {
        cy.get('#toolTipButton').trigger('mouseover');
        cy.contains('You hovered over the Button').should('exist');
        cy.get('#toolTipButton').trigger('mouseout');
        cy.contains('You hovered over the Button').should('not.exist');
    });
});