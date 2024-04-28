import axios from 'axios';

export default {
  //Metodo per l'upload del file
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
    console.log('Eliminazione del dizionario con id:', id);
    //implementazione della chiamata al backend
    return true;
  },
  async loadDictionary(id) {
    console.log('Caricamento del dizionario con id:', id);
    //implementazione della chiamata al backend
    return true;
  }

  };