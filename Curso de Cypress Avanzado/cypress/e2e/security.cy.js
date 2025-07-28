describe('Security Cy', () => {
	it('Should navigate between sites', () => {
		cy.visit('/');
		cy.origin('https://todo-cypress-iota.vercel.app', () => {
			cy.visit('/');
		})
	})


})