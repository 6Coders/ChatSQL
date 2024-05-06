describe('ManagerPage', () => {
    beforeEach(() => {
      cy.visit('/manager');
    });
  
    it('renders correctly', () => {
      cy.get('.container').should('exist');
      cy.get('h1#top').should('have.text', 'Gestione dizionario dati');
      cy.get('[data-cy=file-input]').should('exist');
      cy.get('[data-cy=toast-popup]').should('exist');
      cy.get('[data-cy=view-dictionary]').should('exist');
    });

    it('insert file correctly', () => {
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('[data-cy="upload-button"]').should('be.disabled');
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/dbs_desc.json');
        cy.get('[data-cy="upload-button"]').should('not.be.disabled');
      });
    });
  
    //da sistemare
    it('handles refresh button click', () => {
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('[data-cy="refresh-button"]').click(); 
        cy.wait(5000);
        cy.get('[data-cy="alert-message"]').should('not.be.empty');
      });
    });

    it('adds new rows to the table when refresh button is clicked', () => {
      cy.get('[data-cy="view-dictionary"]').within(() => {
        // Fai clic sul pulsante di aggiornamento
        cy.get('table').find('tr').then(($initialRows) => {
          const initialRowCount = $initialRows.length;
      
          // Fai clic sul pulsante di aggiornamento
          cy.get('[data-cy="refresh-button"]').click();
      
          // Avanza di 6 secondi per simulare il completamento dell'aggiornamento
          cy.wait(6000);
      
          // Ottieni il numero di righe dopo l'aggiornamento
          cy.get('table').find('tr').then(($updatedRows) => {
            const updatedRowCount = $updatedRows.length;
      
            // Verifica che ci siano nuove righe aggiunte alla tabella
            expect(updatedRowCount).to.be.at.least(initialRowCount);
          });
        });
      });
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