describe('Local storage', () => {
	beforeEach(() => {
		cy.session('session todo', () => {

			localStorage.setItem('react_todo_ids', JSON.stringify(['title']));
			localStorage.setItem('title', JSON.stringify({
				title: 'title',
				id: 'title',
				complete: false,
				description: 'description'
			}));
		})
		cy.visit('https://todo-cypress-iota.vercel.app/');
	})

	it('Should add task', () => {
		cy.get('#title').type('Titulo de prueba');
		cy.get('#description').type('Descripcion de prueba');
		cy.contains('Create').click();

		cy.contains('Titulo de prueba');
		cy.reload();
		cy.get('button').contains(/Remove/i).then((title) => {
			expect(localStorage.getItem('Titulo de prueba')).to.exist;
		});
		cy.get('#Titulo\\ de\\ prueba').contains(/Remove/i).click();

		expect(localStorage.getItem('Titulo de prueba')).to.not.exist;

		cy.clearLocalStorage('Titulo de prueba').should(localStorage => {
			expect(localStorage.getItem('prop1')).to.be.null;
		});
	})

	it('Should contain a task', () => {
		expect(cy.contains('title')).to.exist;
	})
})
