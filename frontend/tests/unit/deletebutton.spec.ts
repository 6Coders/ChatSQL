import axios from 'axios';
import DeleteButton from '@/components/DeleteButton';
import MockAdapter from 'axios-mock-adapter'; // Importa AxiosMockAdapter

// Creare un'istanza di AxiosMockAdapter
const mock = new MockAdapter(axios);

// Mock di Axios
jest.mock('axios');

describe('DeleteButton', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Pulisce i mock dopo ogni test
    mock.reset(); // Resetta il mock di AxiosMockAdapter
  });

  it('should delete the file when clicked', async () => {
    const fileID = '123';
    const deleteButton = new DeleteButton('Delete', fileID);

    // Simula una risposta positiva dall'API con status code 200
    mock.onDelete(`/delete/${fileID}`).reply(200);

    // Simula il clic sul pulsante
    await deleteButton.onClick();

    // Verifica che Axios sia stato chiamato con l'endpoint corretto
    expect(axios.delete).toHaveBeenCalledWith(`/delete/${fileID}`);

    // Verifica che la funzione restituisca true
    expect(await deleteButton.onClick()).toBe(true);
  });

  it('should return false on failure', async () => {
    const fileID = '321';
    const deleteButton = new DeleteButton('Delete', fileID);

    // Simula una risposta negativa dall'API con status code 500
    mock.onDelete(`/delete/${fileID}`).reply(500);

    // Simula il clic sul pulsante
    const result = await deleteButton.onClick();

    // Verifica che Axios sia stato chiamato con l'endpoint corretto
    expect(axios.delete).toHaveBeenCalledWith(`/delete/${fileID}`);

    // Verifica che la funzione restituisca false
    expect(result).toBe(false);
  });
});


