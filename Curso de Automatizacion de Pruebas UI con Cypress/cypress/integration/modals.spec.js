describe('Modals test', () => {
    before(() => {
        cy.visit("/alerts");
    })
    it('Should interact with dialogs', () => {
        const stub = cy.stub();
        cy.on("window:confirm", stub);
        
        cy.get("#confirmButton").click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
        }) ;


        cy.contains('You selected Ok').should('exist');
    });
    it('Should interact with dialogs 2', () => {
        cy.reload();
        cy.on("window:confirm", (confirm) => {
            expect(confirm).to.equal('Do you confirm action?')
        });

        
        cy.get('#confirmButton').click();


        cy.contains('You selected Ok').should('exist');
    });

    it('Should cancel dialog', () => {
        cy.reload();
        cy.on("window:confirm", (confirm) => {
            expect(confirm).to.equal('Do you confirm action?');
            return false;
        });

        
        cy.get('#confirmButton').click();


        cy.contains('You selected Cancel').should('exist');
    });
});