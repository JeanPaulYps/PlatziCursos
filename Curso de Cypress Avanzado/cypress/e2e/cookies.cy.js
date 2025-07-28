Cypress.Cookies.defaults({
	preserve: 'name'
})

describe('Cookies', () => {
	before(() => {
		cy.clearCookies();
	});

	after(() => {
		cy.clearCookie('name');
	})

	it('Should get cookies', () => {
		cy.visit('/');
		cy.getCookies().should('be.empty');
	});

	it('Should add cookies', () => {
		cy.setCookie('name', 'Javier');
		cy.getCookies().should('have.length', 1);
	});

	it('Should get specific cookie', () => {
		cy.getCookie('name').should('have.a.property', 'value', 'Javier');
	});


});
