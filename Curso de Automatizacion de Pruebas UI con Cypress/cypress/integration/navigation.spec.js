describe('Navigation', () => {
	it('Should navigate to the first site', () => {
		cy.visit('https://www.platzi.com');
	});

	it('Should reload page', () => {
		
	});

	it('Force reload', () => {
        cy.visit('https://www.platzi.com');
        cy.reload(true);
    });
	it('Should go back', () => {
        cy.visit('https://www.platzi.com');
        cy.visit('https://www.platzi.com/cursos');
        cy.go('back');
    });
	it('Should go forward', () => {
        cy.visit('https://www.platzi.com');
        cy.visit('https://www.platzi.com/cursos');
        cy.go('back');
        cy.go('forward');
    });
});
