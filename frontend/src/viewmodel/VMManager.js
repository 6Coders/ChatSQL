import MManager from '@/model/MManager.js';

/**
 * The Vue component instance.
 * @type {null|object}
 */
let vueComponent = null;

const VMManager = {
  /**
   * Sets the Vue component for the VMManager.
   *
   * @param {Object} component - The Vue component to set.
   */
  setVueComponent(component) {
    vueComponent = component;
  },

  /**
   * Handles the selection of a file.
   * @param {File} file - The selected file.
   * @returns {Promise<void>} - A promise that resolves when the file is handled.
   */
  async handleFileSelected(file) {
    if (!MManager.convalidateFile(file)) 
    {
      vueComponent.setIsUploading(false);
      vueComponent.setToastMessage('Invalid extension or file too large (max 500KB)');
      vueComponent.showToast();
    }
    else 
    {
      try{
      const msg = await MManager.uploadFile(file);
      vueComponent.setIsUploading(false);
      vueComponent.setToastMessage(msg);
      this.handleDictionary();
      vueComponent.showToast();
      }
      catch(error){
        console.log(error);
      }
    }
  },

  /**
   * Handles the deletion of a dictionary.
   * @param {number} id - The ID of the dictionary to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the dictionary is deleted.
   */
  async handleDeleteDictionary(filename) {
    try{
    const response = await MManager.deleteDictionary(filename);
    if(response)
    {
      vueComponent.setToastMessage('Dictionary deleted successfully');
      vueComponent.showToast();
      vueComponent.scrollTo('top');
      this.handleDictionary();
    }
    else
    {
      vueComponent.setToastMessage('Internal Server Error');
      vueComponent.showToast();
      vueComponent.scrollTo('top');
    }
    }
    catch(error){
      console.log(error);
    }
  },

  /**
   * Handles the loading of a dictionary.
   *
   * @param {number} id - The ID of the dictionary to load.
   * @returns {Promise<void>} - A promise that resolves when the dictionary is loaded.
   */
  async handleLoadDictionary(filename) 
  {
    try{
    const response = await MManager.loadDictionary(filename);
    if (!response) 
    {
      vueComponent.setToastMessage('Internal Server Error');
      vueComponent.showToast();
    }
    else
    {
      vueComponent.setToastMessage('Dictionary loaded successfully');
      vueComponent.showToast();
      vueComponent.scrollTo('top');
      vueComponent.handleUpdateEntry();
    }
  }
  catch(error){
    console.log(error);
  }
  },
  
  /**
   * Handles the dictionary functionality.
   * Retrieves dictionaries from MManager, resets the entry, prints the dictionary,
   * sets the refreshing status, and displays an alert message.
   * @returns {Promise<void>} A promise that resolves when the dictionary handling is complete.
   */
  async handleDictionary(){
    try{
    const response = await MManager.getDictionaries();
    if(response && response.length > 0)
    {
      vueComponent.resetEntry();
      vueComponent.printDictionary(response);
      vueComponent.setIsRefreshingStop();
      const currentTime = new Date().toLocaleTimeString();
      const message = `Update success at: ${currentTime}`;
      vueComponent.setAlertMessage(message);
    }
    else
    {
      vueComponent.resetEntry();
      const currentTime = new Date().toLocaleTimeString();
      const message = `No dictionaries found at: ${currentTime}`;
      vueComponent.setAlertMessage(message);
      vueComponent.setIsRefreshingStop();
    }

    }
    catch(error){
      console.log(error);
    }
  }
  
};

export default VMManager;
