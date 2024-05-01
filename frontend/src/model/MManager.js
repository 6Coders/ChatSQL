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
  
  /**
   * Retrieves dictionaries from the backend server.
   * @returns {Promise<Array>} A promise that resolves to an array of dictionaries.
   */
  async getDictionaries()
  {
    try 
    {
      const response = await axios.get('http://localhost:5000/files');
      console.log('Backend response status:', response.status);  
      if (response.status === 200 || response.status === 201) 
      {
        return response.data;
      } else 
      {
        return ;
      }
    } catch (error) 
    {
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

  /**
   * Deletes a dictionary with the specified ID.
   * @param {number} id - The ID of the dictionary to delete.
   * @returns {Promise<boolean|any>} - A promise that resolves to either the deleted dictionary data or false if the deletion fails.
   */
  async deleteDictionary(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/files/${id}`);
      console.log('Backend response status:', response.status);  
      if (response.status === 200 || response.status === 204) {
        return response.data;
      } 
      else 
      {
        return false; 
      }
    } catch (error) 
    {
      return false; 
    }
  },

  async loadDictionary(id) {
    console.log('Caricamento del dizionario con id:', id);
    //implementazione della chiamata al backend
    return true;
  }

  };