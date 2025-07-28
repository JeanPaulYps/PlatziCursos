const DEVICES = [
	{ viewport: "macbook-15", type: "desktop" },
	{ viewport: "ipad-2", type: "mobile" },
	{ viewport: [1280, 720], type: "desktop" },
	{ viewport: [375, 667], type: "mobile" }
];

describe('Mobile devices', () => {
	it('Should use the viewport', () => {
		cy.viewport(1280, 720);
		cy.visit('/');
		cy.contains('Safari').should('exist');
	});
	it('Should use mobile device', () => {
		cy.viewport(375, 667);
		cy.visit('/');
		cy.contains('Safari').should('not.be.visible');
	});
	it('Should use mobile device', () => {
		cy.viewport('iphone-6+');
		cy.visit('/');
		cy.contains('Safari').should('not.be.visible');
	});
	it('Should use desktop', () => {
		cy.viewport("macbook-15");
		cy.visit('/');
		cy.contains('Safari').should('exist');
	})

	DEVICES.forEach(device => {
		it(`Should use the viewport ${device.viewport}`, () => {
			if(Cypress._.isArray(device.viewport)) {
					cy.viewport(device.viewport[0], device.viewport[1]);
				} else {
				cy.viewport(device.viewport);
			}

			cy.visit('/');

			if(device.type === 'desktop') {
				cy.contains('Safari').should('exist');
			} else {
				cy.contains('Safari').should('not.be.visible');
			}
		})
	})
})