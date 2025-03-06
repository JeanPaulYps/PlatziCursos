describe('Interacting with tables', () => {
    before(() => {
        cy.visit("https://www.w3schools.com/html/html_tables.asp");
    })

    it('Should', () => {
        cy.get("#customers").find('th').each((el) => cy.log(el.text()));
    });
});