describe('Drag and drop ', () => {
    before(() => {
        cy.visit('/dragabble')
    });

    it('Should drag element', () => {
        cy.get('#dragBox').trigger('mousedown', {
            which: 1,
            pageX: 0,
            pageY: 0
        }).trigger('mousemove', {
            which: 1,
            pageX: 200,
            pageY: 200
        }).trigger('mouseup');
    });
});