describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the Gestione dizionario dati card', () => {
    cy.get('[data-cy=gestione-dizionario]').should('exist');
  });

  it('displays the correct title and description for Gestione dizionario dati', () => {
    cy.get('[data-cy=gestione-dizionario] .card-title').should('have.text', 'Gestione dizionario dati');
    cy.get('[data-cy=gestione-dizionario] .card-text').should('contain', 'visualizzare e gestire i dizionari dati');
  });

  it('renders the ChatSQL card', () => {
    cy.get('[data-cy=chatsql]').should('exist');
  });

  it('displays the correct title and description for ChatSQL', () => {
    cy.get('[data-cy=chatsql] .card-title').should('have.text', 'ChatSQL');
    cy.get('[data-cy=chatsql] .card-text').should('contain', 'fare una richiesta in linguaggio naturale');
  });


  it('navigates to the Request page when ChatSQL button is clicked', () => {
    cy.get('[data-cy=chatsql-button]').click();
    cy.url().should('include', '/request');
  });

  it('navigates to the Manager page when Gestione dizionario dati button is clicked', () => {
    cy.get('[data-cy=gestione-dizionario-button]').click();
    cy.url().should('include', '/manager');
  });
});
