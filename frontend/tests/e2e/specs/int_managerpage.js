describe('ManagerPage', () => {
    beforeEach(() => {
      cy.visit('/manager'); // Assicurati di aggiornare l'URL se necessario
    });
  
    it('renders correctly', () => {
      cy.get('.container').should('exist');
      cy.get('h1#top').should('have.text', 'Gestione dizionario dati');
      cy.get('[data-cy=gestione-dizionario]').should('exist');
      cy.get('[data-cy=chatsql]').should('exist');
    });
  
    it('handles file selection', () => {
      const fileName = 'testFile.txt'; // Simula il nome del file selezionato
      cy.get('input[type="file"]').attachFile(fileName);
      // Assicurati di testare che la funzione di gestione della selezione del file venga chiamata correttamente
    });
  
    it('handles load button click', () => {
      cy.get('[data-cy=gestione-dizionario-button]').click();
      // Assicurati di testare che la funzione di gestione del click sul pulsante di caricamento venga chiamata correttamente
      cy.wait(1000); // Attendi 1 secondo per il caricamento
      // Verifica che il caricamento sia avvenuto correttamente visualizzando gli elementi caricati
      cy.get('[data-cy=dictionary-entry]').should('exist');
    });
  
    it('handles delete button click', () => {
      cy.get('[data-cy=chatsql-button]').click();
      // Assicurati di testare che la funzione di gestione del click sul pulsante di eliminazione venga chiamata correttamente
      cy.wait(1000); // Attendi 1 secondo per il caricamento
      // Verifica che il dizionario sia stato eliminato correttamente
      cy.get('[data-cy=chatsql]').should('not.exist');
    });
  
    it('displays toast message', () => {
      const message = 'Test toast message'; // Messaggio di prova per il toast
      // Chiamare la funzione del componente per impostare il messaggio del toast
      cy.window().its('app.$refs.Toast').invoke('setTest', message);
      // Assicurati che il toast sia visualizzato
      cy.get('#toast').should('contain', message);
    });
  
    it('scrolls to top on toast click', () => {
      // Simula il click sul toast per scorrere verso l'alto
      cy.get('#toast').click();
      // Assicurati che la pagina sia stata scorrere fino in cima
      cy.get('h1#top').should('be.visible');
    });
  
    // Aggiungi altri test per altre interazioni o comportamenti se necessario
  });