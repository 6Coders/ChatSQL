import axios from '@/axios';
import useManagerModel from '@/model/MManager';
import MockAdapter from 'axios-mock-adapter'; // Importa la libreria axios-mock-adapter

const mock = new MockAdapter(axios); // Crea un'istanza di axios-mock-adapter

describe('useManagerModel', () => {
  beforeEach(() => {
    mock.reset(); // Reimposta il mock prima di ogni test per assicurarti che non ci siano interferenze tra i test
  });

  describe('uploadFile', () => {
    afterEach(() => {
        mock.reset();
      });

    it('should upload a file successfully', async () => {
      const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
      const responseData = 'upload successful';
      mock.onPost('/upload').reply(200, responseData);

      const result = await useManagerModel.uploadFile(file);

      expect(result).toBe(responseData);
    });

    it('should handle server error during file upload', async () => {
      const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
      mock.onPost('/upload').reply(500);

      const result = await useManagerModel.uploadFile(file);

      expect(result).toBe('Internal Server Error');
    });

    it('should upload a file successfully with status 200', async () => {
        const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
        const responseData = 'upload successful';
        mock.onPost('/upload').reply(200, responseData);
  
        const result = await useManagerModel.uploadFile(file);
  
        expect(result).toBe(responseData);
      });
  
      it('should upload a file successfully with status 201', async () => {
        const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
        const responseData = 'upload successful';
        mock.onPost('/upload').reply(201, responseData);
  
        const result = await useManagerModel.uploadFile(file);
  
        expect(result).toBe(responseData);
      });
  
      it('should handle server error during file upload', async () => {
        const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
        mock.onPost('/upload').reply(500);
  
        const result = await useManagerModel.uploadFile(file);
  
        expect(result).toBe('Internal Server Error');
      });
  
      it('should handle request error during file upload', async () => {
        const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
        mock.onPost('/upload').networkError();
  
        const result = await useManagerModel.uploadFile(file);
  
        expect(result).toBe('Internal Server Error');
      });
  });

  describe('getDictionaries', () => {
    afterEach(() => {
        mock.reset();
      });

    it('should retrieve dictionaries successfully', async () => {
      const responseData = [{ id: 1, name: 'dictionary1' }];
      mock.onGet('/files').reply(200, responseData);

      const result = await useManagerModel.getDictionaries();

      expect(result).toEqual(responseData);
    });

    it('should handle server error during retrieval of dictionaries', async () => {
      mock.onGet('/files').reply(500);

      const result = await useManagerModel.getDictionaries();

      expect(result).toBeUndefined();
    });

    it('should retrieve dictionaries successfully with status 200', async () => {
        const responseData = [{ id: 1, name: 'dictionary1' }];
        mock.onGet('/files').reply(200, responseData);
  
        const result = await useManagerModel.getDictionaries();
  
        expect(result).toEqual(responseData);
      });
  
      it('should retrieve dictionaries successfully with status 201', async () => {
        const responseData = [{ id: 1, name: 'dictionary1' }];
        mock.onGet('/files').reply(201, responseData);
  
        const result = await useManagerModel.getDictionaries();
  
        expect(result).toEqual(responseData);
      });
  
      it('should handle server error during retrieval of dictionaries', async () => {
        mock.onGet('/files').reply(500);
  
        const result = await useManagerModel.getDictionaries();
  
        expect(result).toBeUndefined();
      });
  
      it('should handle request error during retrieval of dictionaries', async () => {
        mock.onGet('/files').networkError();
  
        const result = await useManagerModel.getDictionaries();
  
        expect(result).toBeUndefined();
      });
  });

  describe('deleteDictionary', () => {
    afterEach(() => {
        mock.reset();
      });

    it('should delete dictionary successfully with status 200', async () => {
        const filename = 'example.json';
        const responseData = { message: 'Dictionary deleted successfully' };
        mock.onDelete('http://localhost:5000/delete').reply(200, responseData);
  
        const result = await useManagerModel.deleteDictionary(filename);
  
        expect(result).toEqual(responseData);
      });
  
      it('should delete dictionary successfully with status 204', async () => {
        const filename = 'example.json';
        mock.onDelete('http://localhost:5000/delete').reply(204);
  
        const result = await useManagerModel.deleteDictionary(filename);
  
        expect(result).toBeUndefined();
      });
  
      it('should handle server error during dictionary deletion', async () => {
        const filename = 'example.json';
        mock.onDelete('http://localhost:5000/delete').reply(500);
  
        const result = await useManagerModel.deleteDictionary(filename);
  
        expect(result).toBe(false);
      });
  
      it('should handle request error during dictionary deletion', async () => {
        const filename = 'example.json';
        mock.onDelete('http://localhost:5000/delete').networkError();
  
        const result = await useManagerModel.deleteDictionary(filename);
  
        expect(result).toBe(false);
      });
  });

  describe('loadDictionary', () => {
    afterEach(() => {
        mock.reset();
      });
      
    it('should load dictionary successfully with status 200', async () => {
        const filename = 'example.json';
        mock.onPost('http://localhost:5000/select').reply(200);
  
        const result = await useManagerModel.loadDictionary(filename);
  
        expect(result).toBe(true);
      });
  
      it('should handle server error during dictionary loading', async () => {
        const filename = 'example.json';
        mock.onPost('http://localhost:5000/select').reply(500);
  
        const result = await useManagerModel.loadDictionary(filename);
  
        expect(result).toBe(false);
      });
  
      it('should handle request error during dictionary loading', async () => {
        const filename = 'example.json';
        mock.onPost('http://localhost:5000/select').networkError();
  
        const result = await useManagerModel.loadDictionary(filename);
  
        expect(result).toBe(false);
      });

  });

  describe('convalidateFile', () => {
    it('should validate a file with allowed extension and valid size', () => {
      const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
      Object.defineProperty(file, 'size', { value: 1024});
      const result = useManagerModel.convalidateFile(file);

      expect(result).toBe(true);
    });

    it('should invalidate a file with disallowed extension', () => {
      const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
      Object.defineProperty(file, 'size', { value: 1024});
      const result = useManagerModel.convalidateFile(file);

      expect(result).toBe(false);
    });

    it('should invalidate a file with invalid size', () => {
      const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
      Object.defineProperty(file, 'size', { value: 600 * 1024});
      const result = useManagerModel.convalidateFile(file);

      expect(result).toBe(false);
    });
    });

    describe('isExtensionAllowed', () => {
        it('should return true for a file with allowed extension', () => {
          const file = new File(['dummy content'], 'test.json', { type: 'application/json' });

          const result = useManagerModel.isExtensionAllowed(file);

          expect(result).toBe(true);
        });
        it('should return false for a file with disallowed extension', () => {
            const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    
            const result = useManagerModel.isExtensionAllowed(file);
    
            expect(result).toBe(false);
            });
    });

    describe('isSizeValid', () => {
        it('should return true for a file with valid size', () => {
            const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
            Object.defineProperty(file, 'size', { value: 1024});
            const result = useManagerModel.isSizeValid(file);
        
            expect(result).toBe(true);
            });
        it('should return false for a file with invalid size', () => {
            const file = new File(['dummy content'], 'test.json', { type: 'application/json' });
            Object.defineProperty(file, 'size', { value: 600 * 1024});
        
            const result = useManagerModel.isSizeValid(file);
        
            expect(result).toBe(false);
            });
    });
});