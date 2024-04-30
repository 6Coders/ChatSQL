import axios from 'axios';

export default {
  async uploadFile(file) 
  {
    try 
    {
      //Invio del file al backend
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Backend response status:', response.status);  
      if (response.status === 200 || response.status === 201) 
      {
        console.log('Backend response data:', response.data);  
        return response.data;
      } else 
      {
        return 'Internal Server Error';
      }
    } catch (error) 
    {
      console.error('Internal Server Error:', error);
      return 'Internal Server Error';
    }
  },
  /*Ritorna la lista dei dizionari presenti a sistema*/
  async getDictionaries()
  {
    try 
    {
      const response = await axios.get('http://localhost:5000/files');
      console.log('Backend response status:', response.status);  
      if (response.status === 200 || response.status === 201) 
      {
        /*Se lo stato 200 || 201 la richiesta è andata a buon fine e ritorno la lista dei dizionari*/
        return response.data;
      } else 
      {
        /*Altrimenti ritorno un messaggio di errore*/
        return ;
      }
    } catch (error) 
    {
      /*Errore interno al server*/
      console.error('Internal Server Error:', error);
      return ;
    }
  },
  convalidateFile(file) {
    console.log('Convalida del file:', file.name);
    const flag = this.isExtensionAllowed(file) && this.isSizeValid(file);
    console.log('Convalida completata:', flag);
    return flag;
  },
  isExtensionAllowed(file) {
    const allowedExtensions = ['.json'];
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes('.' + extension);
  },
  isSizeValid(file) {
    const maxSize = 500 * 1024; 
    return file.size <= maxSize;
  },
  
  async deleteDictionary(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/files/${id}`);
      console.log('Backend response status:', response.status);  
      if (response.status === 200 || response.status === 204) {
        // Se lo stato 200 o 204 indica che la richiesta è andata a buon fine
        console.log('File eliminato con successo');
        return true; // Oppure potresti restituire un messaggio di successo
      } else {
        // Altrimenti ritorna false o un messaggio di errore
        console.error('Errore durante l\'eliminazione del file');
        return false; // Oppure potresti gestire diversamente l'errore
      }
    } catch (error) {
      // Errore interno al server o errore di rete
      console.error('Internal Server Error:', error);
      return false; // Oppure potresti gestire diversamente l'errore
    }
  },
  async loadDictionary(id) {
    console.log('Caricamento del dizionario con id:', id);
    //implementazione della chiamata al backend
    return true;
  }

  };