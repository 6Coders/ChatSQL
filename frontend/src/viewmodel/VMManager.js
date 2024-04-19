import MManager from '@/model/MManager.js';

const VMManager = {
  handleFileSelected(file, handleFileError, resetFields) {
    if (!MManager.convalidateFile(file)) {
      handleFileError('File non valido');
    } else 
    {
      resetFields();
      if(!MManager.uploadFile(file))
      {
        handleFileError('Errore interno al server , non è stato possibile caricare il file');
      }
    }
  }
};

export default VMManager;
