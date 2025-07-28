describe('Intercepting network request', () => {
	it('Should intercept request', () => {
		cy.request('https://pokeapi.co/api/v2/pokemon/ditto', (response) => {
			expect(response.body).to.have.property('name', 'ditto');
			expect(response.status).to.eq(200);
			cy.log(response.body);
		})
	})
	it('Simple intercept request', () => {
		cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1').as('bulbasaur');
		cy.visit('/');
		cy.contains('Bulbasaur').parent().parent().within(element => {
			cy.wrap(element).contains('Más detalles').click();
		});

		/*cy.wait('@bulbasaur').then(intercepted => {
			expect(intercepted.response.body).to.have.property('name', 'bulbasaur');
			expect(intercepted.response.statusCode).to.eq(200);
			cy.log(intercepted);
		}) ;*/

		cy.wait('@bulbasaur').its('response.statusCode').should('eq', 200);
	})

	it('Should fail request', () => {
		cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1',
			{forceNetworkError: true}
		).as('bulbasaur');
		cy.visit('/');
		cy.contains('Bulbasaur').parent().parent().within(element => {
			cy.wrap(element).contains('Más detalles').click();
		});
	})

	it.only('Should intercept request changing body', () => {
		cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1',
			{
				statusCode: 200,
				body: {

				}
			}
		).as('pikachu');
	})

})