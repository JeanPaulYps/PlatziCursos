import { loginPage } from '../pageObjects/LoginPage';

describe('Login with POM', () => {
	beforeEach(() => {
		/*cy.visit('http://zero.webappsecurity.com/login.html');*/
		loginPage.visit();
	})

	it('Shouls show inuts and button', () => {
		loginPage.validateLoginInPage();
	})

	it('Should get error on login', () => {
		loginPage.login('lalalalala', 'lalalala');
		loginPage.validateErrorLogin();
	})

	it('Should get a success on login', () => {
		cy.reload();
		loginPage.validateLoginInPage();
		loginPage.login('username', 'password');
		loginPage.validateSuccessLogin();
	})

	it('Should get a success on login with env', () => {
		cy.reload();
		loginPage.validateLoginInPage();
		loginPage.login(Cypress.env('credentials').user, Cypress.env('credentials').password);
		loginPage.validateSuccessLogin();
	})

	it('Should get a success on login with cy.json', () => {
		cy.reload();
		cy.log(Cypress.env());
		loginPage.validateLoginInPage();
		loginPage.login(Cypress.env('credentials').user, Cypress.env('credentials').password);
		loginPage.validateSuccessLogin();
	})
})

describe.only('Login with fixtures', () => {
	beforeEach(() => {
		loginPage.visit('/');
	})

	it('Should get an error on login', () => {
		loginPage.validateLoginInPage();
		cy.fixture('credentials').then( credentials => {
			loginPage.login(credentials.email, credentials.password);
		})

		loginPage.validateErrorLogin();
	});

	it('Should get an error on login 2', () => {
		loginPage.validateLoginInPage();
		cy.fixture('credentials').then( credentials => {
			loginPage.login(credentials.email, credentials.password);
		})

		loginPage.validateErrorLogin();
	})
})