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
  async handleDeleteDictionary(id) {
    const response = await MManager.deleteDictionary(id);
    vueComponent. setToastMessage(response);
    vueComponent.scrollToTop('top');
  },
  handleLoadDictionary(id) {
    if (!MManager.loadDictionary(id)) {
      console.log('Errore interno al server, non è stato possibile caricare il dizionario');
    }
    else
    {
      console.log('Dizionario caricato con successo');
    }
  },
  /*Ritorna la lista dei dizionari presenti a sistema*/
  async handleDictionary(){
    const response = await MManager.getDictionaries();
    if(response && response.length > 0)
    {
      vueComponent.printDictionary(response);
    }
    else
    {
      vueComponent.resetEntry();
      const currentTime = new Date().toLocaleTimeString();
      const message = `No dictionaries found at: ${currentTime}`;
      vueComponent.alertmsgDictionary(message);
    }
  }
};

export default VMManager;
