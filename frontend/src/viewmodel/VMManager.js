import MManager from '@/model/MManager.js';

// VMManager.js
const VMManager = {
    handleFileSelected(file) {
      console.log('File selezionato:', file);
      MManager.uploadFile(file);
    }
  };
  
  export default VMManager;