import MManager from '@/model/MManager.js';

let vueComponent = null;

const VMManager = {
  setVueComponent(component) {
    vueComponent = component;
  },
  async handleFileSelected(file) {
    if (!MManager.convalidateFile(file)) 
    {
      return 'Estensione non valida o file troppo grande (max 500KB)';
    }
    else 
    {
      const message = await MManager.uploadFile(file);
      console.log('Messaggio:', message);
      return message;
    }
  },
  /**
   * Handles the deletion of a dictionary.
   * @param {number} id - The ID of the dictionary to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the dictionary is deleted.
   */
  async handleDeleteDictionary(id) {
    const response = await MManager.deleteDictionary(id);
    if(response)
    {
      vueComponent.setToastMessage('Dictionary deleted successfully');
      vueComponent.scrollTo('top');
      vueComponent.handleDictionary();
    }
    else
    {
      vueComponent.setToastMessage('Internal Server Error');
      vueComponent.scrollTo('top');
    }
  },

  handleLoadDictionary(filename) {
    if (!MManager.loadDictionary(filename)) {
      console.log('Errore interno al server, non è stato possibile caricare il dizionario');
    }
    else
    {
      console.log('Dizionario caricato con successo');
    }
  },
  
  
  /**
   * Handles the dictionary functionality.
   * Retrieves dictionaries from MManager, resets the entry, prints the dictionary,
   * sets the refreshing status, and displays an alert message.
   * @returns {Promise<void>} A promise that resolves when the dictionary handling is complete.
   */
  async handleDictionary(){
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
  
};

export default VMManager;
