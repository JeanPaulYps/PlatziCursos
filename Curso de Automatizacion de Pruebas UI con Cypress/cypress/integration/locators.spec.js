describe('Locators types', () => { 
    it('Visit the page', () => {        
        cy.visit('/automation-practice-form');
       
    });
    it('Get a tag', () => {
        cy.get('input');
    })
    it('Get an attribute and tag', () => {
        cy.get('input[placeholder="First Name"]');
    });

    it('Get by id', () => {
        cy.get('#firstName')
    })
    
    it('Get by class', () => {
        cy.get('.form-control')
    })
   
    it('Using contains', () => {
        cy.contains('Reading');
        cy.contains('.header-wrapper', 'Widgets')
    })

    it('Using parent', () => {
        cy.get('input[placeholder="First Name"]').parent();
        cy.get('input[placeholder="First Name"]').parents().find('label');
        cy.get('form').find('label');
    });


 })