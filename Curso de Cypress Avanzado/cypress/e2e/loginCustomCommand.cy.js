describe('Login custom command', () => {
	it('Should get an error from loggin', () => {
		cy.login('sdsds', 'sdsdsds');
		cy.log(Cypress.env());
	});


})