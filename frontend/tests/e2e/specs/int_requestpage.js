describe('RequestPage', () => {
    beforeEach(() => {
      cy.visit('/request');
    }
    );

    it('renders correctly', () => {
      cy.get('[data-cy=request-page]').should('exist');
      cy.get('[data-cy=chat]').should('exist');
      cy.get('[data-cy=request-input]').should('exist');
      cy.get('[data-cy=send-request-button]').should('exist');
      cy.get('[data-cy=selected-dictionary]').should('exist');
    });

    it('makes send request button enabled when input is not empty', () => {
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').should('not.be.disabled');
    });

    it('makes send request button disabled when input is empty', () => {
      cy.get('[data-cy=request-input]').clear();
      cy.get('[data-cy=send-request-button]').should('be.disabled');
    });

    it('handles send request button click', () => {
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy="chat"]').find('img').should('not.exist');
    });

    it('detects if the clear button is not present when there is no response', () => {
      cy.get('[data-cy=request-input]').clear();
      cy.get('[data-cy="chat"]').find('img').should('exist');
      cy.get('[data-cy=clear-button]').should('not.exist');
    }
    );

    it('detects if the clear button is present when there is a response', () => {
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=clear-button]').should('exist');
    });

    it('handles clear button click', () => {
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=clear-button]').click();
      cy.get('[data-cy="chat"]').find('img').should('exist');
    });

    it('displays toast message when copy button is clicked', () => {
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=copy-button]').click();
      cy.get('[data-cy=chat]').find('#toast').should('exist');
    });

    it('auto scrolls to bottom of chat on new message', () => {
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=request-input]').type('test request');
      cy.get('[data-cy=send-request-button]').click();
      cy.get('[data-cy=chat]').find('#message-list .border-bottom:last').should('exist');
      cy.get('[data-cy=chat]').find('#message-list .border-bottom:last').should('be.visible');
    });
});