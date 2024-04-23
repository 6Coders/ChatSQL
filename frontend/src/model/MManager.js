import axios from 'axios';

export default {
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('URL_DEL_BACKEND', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Risposta dal backend:', response.status);  
      if (response.status === 200 || response.status === 201) {
        return true; 
      } else {
        return false;
      }
    } catch (error) {
      console.error('Errore durante l\'invio del file al backend:', error);
      return false;
    }
  },
    convalidateFile(file) {
      return this.isExtensionAllowed(file) && this.isSizeValid(file);
    },
    isExtensionAllowed(file) {
      const allowedExtensions = ['.json'];
      const extension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.includes('.' + extension);
    },
    isSizeValid(file) {
      const maxSize = 500 * 1024; 
      return file.size <= maxSize;
    }
  };