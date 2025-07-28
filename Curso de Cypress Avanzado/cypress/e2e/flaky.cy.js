describe('Flaky tests', () => {
	it('Should found single command', () => {
		cy.visit('/')
		/*cy.get('h1').contains('Bulbasuuuur');*/
		cy.contains('h1', 'bulbasuuuur');
	})
})