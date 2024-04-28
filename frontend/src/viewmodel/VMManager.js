import MManager from '@/model/MManager.js';

const VMManager = {
  async handleFileSelected(file) {
    var message='';
    if (!MManager.convalidateFile(file)) 
    {
      message= 'Estensione non valida o file troppo grande (max 500KB)';
    }
    else 
    {
      message= await MManager.uploadFile(file);
    }
    return message;
  },
  handleDeleteDictionary(id) {
    if (!MManager.deleteDictionary(id)) {
      console.log('Errore interno al server, non è stato possibile eliminare il dizionario');
    }
    else
    {
      console.log('Dizionario eliminato con successo');
    }
  },
  handleLoadDictionary(id) {
    if (!MManager.loadDictionary(id)) {
      console.log('Errore interno al server, non è stato possibile caricare il dizionario');
    }
    else
    {
      console.log('Dizionario caricato con successo');
    }
  }
};

export default VMManager;
