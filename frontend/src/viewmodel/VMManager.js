import MManager from '@/model/MManager.js';

const VMManager = {
  handleFileSelected(file) {
    var message='';
    if (!MManager.convalidateFile(file)) 
    {
      message= 'Estensione non valida o file troppo grande (max 500KB)';
    }
    else 
    {
      if(!MManager.uploadFile(file))
      {
        message= 'Errore interno al server, non è stato possibile inviare il file';
      }
      message= 'File inviato con successo';
    }
    console.log(message);
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
