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

    it('upload button becomes active when the file is uploaded', () => {
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('[data-cy="upload-button"]').should('be.disabled');
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/dbs_desc.json');
        cy.get('[data-cy="upload-button"]').should('not.be.disabled');
      });
    });

    it('Invalid files are not added', () => {
      let initialRowCount;
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('[data-cy="refresh-button"]').click();
        cy.wait(3000);
        cy.get('table').find('tr').then(($initialRows) => {
          initialRowCount = $initialRows.length;
          cy.log(initialRowCount);
        });
      });
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/testFile.txt');
        cy.get('[data-cy="upload-button"]').click();
      });
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('table').find('tr').then(($updatedRows) => {
          const updatedRowCount = $updatedRows.length;
          cy.log(updatedRowCount);
          expect(updatedRowCount).to.equal(initialRowCount);
        });
      });
    });

    it('Invalid file show message', () => {
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/testFile.txt');
        cy.get('[data-cy="upload-button"]').click();
      });
      cy.wait(1000);
      cy.get('[data-cy="toast-popup"]').within(() => {
        cy.get('[data-cy="popup-message"]').invoke('text').then(text => {
          expect(text).to.include('Invalid extension or file too large (max 500KB)');
        });
      });
    });
    
    it('insert new file correctly by adding new row', () => {
      let initialRowCount;
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('table').find('tr').then(($initialRows) => {
          initialRowCount = $initialRows.length;
          cy.log(initialRowCount);
        });
      });
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/dbs_desc.json');
        cy.get('[data-cy="upload-button"]').click();
      });
      cy.wait(3000);
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('table').find('tr').then(($updatedRows) => {
          const updatedRowCount = $updatedRows.length;
          cy.log(updatedRowCount);
          if(updatedRowCount > 1) {
            expect(updatedRowCount).to.be.at.above(initialRowCount);
          } else {
            cy.log('Il numero di righe aggiornate non è maggiore di 1');
          }
        });
      });
    });

    it('insert new file correctly by showing success message', () => {
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/dbs_desc2.json');
        cy.get('[data-cy="upload-button"]').click();
      });
      cy.wait(1000);
      cy.get('[data-cy="toast-popup"]').within(() => {
        cy.get('[data-cy="popup-message"]').invoke('text').then(text => {
          expect(text).to.include('File aggiunto correttamente');
        });
      });
      });

    it('Duplicate files are not added', () => {
      let initialRowCount;
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('[data-cy="refresh-button"]').click();
        cy.wait(3000);
        cy.get('table').find('tr').then(($initialRows) => {
          initialRowCount = $initialRows.length;
          cy.log(initialRowCount);
        });
      });
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/dbs_desc.json');
        cy.get('[data-cy="upload-button"]').click();
      });
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('table').find('tr').then(($updatedRows) => {
          const updatedRowCount = $updatedRows.length;
          cy.log(updatedRowCount);
          expect(updatedRowCount).to.equal(initialRowCount);
        });
      });
    });

    it('Duplicate file show message', () => {
      cy.get('[data-cy="file-input"]').within(() => {
        cy.get('input[type="file"]').selectFile('tests/e2e/fixtures/dbs_desc.json');
        cy.get('[data-cy="upload-button"]').click();
      });
      cy.wait(1000);
      cy.get('[data-cy="toast-popup"]').within(() => {
        cy.get('[data-cy="popup-message"]').invoke('text').then(text => {
          expect(text).to.include('è già stato caricato precedentemente');
        });
      });
    });
  
    it('handles refresh button click', () => {
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('[data-cy="refresh-button"]').click(); 
        cy.wait(6000);
        cy.get('[data-cy="alert-message"]').invoke('text').then(text => {
          expect(text).to.include('Update success at') || expect(text).to.include('No dictionaries found');
        });
      });
    });

    it('adds new rows to the table when refresh button is clicked', () => {
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('table').find('tr').then(($initialRows) => {
          const initialRowCount = $initialRows.length;
          cy.get('[data-cy="refresh-button"]').click();
          cy.wait(6000);
          cy.get('table').find('tr').then(($updatedRows) => {
            const updatedRowCount = $updatedRows.length;
            expect(updatedRowCount).to.be.at.least(initialRowCount);
          });
        });
      });
    });
    
    it('handles load button click', () => {
      cy.get('[data-cy="view-dictionary"]').within(() => {
        let rowCount;
        cy.get('[data-cy="refresh-button"]').click();
        cy.wait(3000); 
          cy.get('table').find('tr').then(($initialRows) => {
            rowCount = $initialRows.length;
            if(rowCount > 1) 
            {
              cy.get('[data-cy="dbs_descload"]').click();
              cy.wait(3000); 
              cy.get('tbody tr.table-success').each(($row) => {
                cy.wrap($row).find('.bi.bi-check').should('exist');
              });
            }
            else
            {
              cy.log('il conteggio delle righe è minore o uguale a 1');
            }
          });
      });
    });
  
    it('handles delete button click', () => {
      cy.get('[data-cy="view-dictionary"]').within(() => {
        let rowCount;
        cy.get('[data-cy="refresh-button"]').click();
        cy.wait(3000); 
        cy.get('table').find('tr').then(($initialRows) => {
          rowCount = $initialRows.length;
          if(rowCount > 1) {
            cy.get('[data-cy="dbs_descdelete"]').click();
            cy.wait(3000);
            cy.get('table').find('tr').then(($updatedRows) => {
              const updatedRowCount = $updatedRows.length;
              expect(updatedRowCount).to.be.lessThan(rowCount);
            }); 
          } else {
            cy.log('Il conteggio delle righe è minore o uguale a 1');
          }
        });
      });
    });

    it('handles load button click by showing message', () =>{
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('[data-cy="dbs_desc2load"]').click();
        cy.wait(1000); 
      });
      cy.get('[data-cy="toast-popup"]').within(() => {
        cy.get('[data-cy="popup-message"]').invoke('text').then(text => {
          expect(text).to.include('Dictionary loaded successfully');
        });
      });
    });

    it('handles delete button click by showing message', () =>{
      cy.get('[data-cy="view-dictionary"]').within(() => {
        cy.get('[data-cy="dbs_desc2delete"]').click();
        cy.wait(1000); 
      });
      cy.get('[data-cy="toast-popup"]').within(() => {
        cy.get('[data-cy="popup-message"]').invoke('text').then(text => {
          expect(text).to.include('Dictionary deleted successfully');
        });
      });
    });

  });