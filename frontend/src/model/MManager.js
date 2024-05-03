import axios from '@/axios';

export default {

  /**
   * Uploads a file to the server.
   * @param {File} file - The file to be uploaded.
   * @returns {Promise<string>} A promise that resolves to the response data or an error message.
   */
  async uploadFile(file) 
  {
    try 
    {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200 || response.status === 201) 
      {
        return response.data;
      } 
      else 
      {
        return 'Internal Server Error';
      }
    } 
    catch (error) 
    {
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
      const response = await axios.get('/files');
      if (response.status === 200 || response.status === 201) 
      {
        return response.data;
      } else 
      {
        return ;
      }
    } catch (error) 
    {
      return ;
    }
  },

  /**
   * Validates a file based on its extension and size.
   * @param {File} file - The file to be validated.
   * @returns {boolean} - Returns true if the file is valid, otherwise false.
   */
  convalidateFile(file) {
    return this.isExtensionAllowed(file) && this.isSizeValid(file);
  },

  /**
   * Checks if the extension of a file is allowed.
   *
   * @param {File} file - The file to check.
   * @returns {boolean} - Returns true if the extension is allowed, false otherwise.
   */
  isExtensionAllowed(file) {
    const allowedExtensions = ['.json'];
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes('.' + extension);
  },

  /**
   * Checks if the size of a file is valid.
   * @param {File} file - The file to check the size of.
   * @returns {boolean} - Returns true if the file size is valid, false otherwise.
   */
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

  /**
   * Loads a dictionary from the backend server.
   * @param {number} index - The index of the dictionary to load.
   * @returns {Promise<Boolean>} - A promise that resolves with the loaded dictionary data, or false if the loading fails.
   */
  async loadDictionary(index) {
    try {
      const response = await axios.post('http://localhost:5000/load', { data: index });
      console.log('Backend response status:', response.status);  
      if (response.status === 200) {
        return true; 
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  };