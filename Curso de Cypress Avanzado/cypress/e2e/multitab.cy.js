describe('Should navigate between tabs', () => {
	it('Visit links with target blank', () => {
		cy.visit('https://demoqa.com/links');
		cy.get('#simpleLink').click();
	})
})