# backend

# Installazione

- Clonare la repository
- Tramite Command Shell posizionarsi nel percorso ./backend;
- Installare le dipendeze con il comando:
  - **pip install -r ./requirements.txt**
- Avviare il backend con il comando:
  - **python ./main.py**

## Testing

Per eseguire l'analisi statica eseguire il comando:

- **flake8** seguito dal nome del file su cui eseguire il linting

Per eseguire i test di unità e di integrazione eseguire il comando:

- **python -m unittest discover -s .\tests**
