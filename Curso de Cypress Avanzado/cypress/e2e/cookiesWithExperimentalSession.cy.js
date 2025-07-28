describe('Cookies with experimental', ()=> {
	before(() => {
		// cy.clearCookies();
	});


	beforeEach(() => {
		cy.session('login', () => {
			cy.visit('/');
			cy.setCookie('name', 'Javier');
		});
	})

	/*it('Should get cookies', () => {
		cy.getCookies().should('be.empty');
	});*/

	it('Should add cookies', () => {
		cy.setCookie('name', 'Javier');
		cy.getCookies().should('have.length', 1);
	});

	it('Should get specific cookie', () => {
		cy.getCookie('name').should('have.a.property', 'value', 'Javier');
	});


})