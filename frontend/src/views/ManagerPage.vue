<template>
  <div class="container">
    
    <h1 id="top">Gestione dizionario dati</h1>
    <input-file ref="fileInput" @file-selected="handleFileSelected" :uploadButtonClass="uploadButtonClass"></input-file>
    <toast-popup ref="Toast" id="toast"/> 
    <view-dictionary ref="Dictionary" @load-button-clicked="handleLoadButtonClicked" @delete-button-clicked="handleDeleteButtonClicked" @update-entry="handleUpdateEntry"  :load-button-class="loadButtonClass" :delete-button-class="deleteButtonClass"/>
    
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';
import ViewDictionary from '@/components/ViewDictionary.vue';
import ToastPopup from '@/components/ToastPopup.vue';
import VMManager from '@/viewmodel/VMManager.js';

export default {
  name: 'ManagerPage',
  components: {
    InputFile,
    ViewDictionary,
    ToastPopup
  },
  data() {
    return {
      loadButtonClass: 'btn btn-success',
      deleteButtonClass: 'btn btn-danger',
      uploadButtonClass: 'btn btn-outline-secondary',
    };
  },
  mounted() 
  {
    //Dependency Injection
    VMManager.setVueComponent(this);
    //Aggiorno la tabella con i dizionari presenti
    this.handleUpdateEntry();
  },
  methods: {
    async handleFileSelected(file) {
      const message = await VMManager.handleFileSelected(file);
      console.log('Message:', message);
      this.$refs.fileInput.setIsUploading(false);
      this.setToastMessage(message);
    },
    handleLoadButtonClicked(index) {
      console.log('LoadButton clicked for row index:', index);
      VMManager.handleLoadDictionary(index);
    },
    handleDeleteButtonClicked(index) {
      console.log('DeleteButton clicked for row index:', index);
      VMManager.handleDeleteDictionary(index);
    },
    handleUpdateEntry(){
      VMManager.handleDictionary();
    },
    printDictionary(response) {
      if(response && response.length > 0)
      {
        //elimino le entry attuali (possibile ottimizzazione ma complesso da implementare)
        this.$refs.Dictionary.deleteEntry();
        /*Se ci sono dizionari presenti allora li aggiungo alla tabella*/
        for(const row of response)
        {
          /*
          Sotituire appena ci sarà la funzionalità nel backend
          this.$refs.Dictionary.addNewEntry(row.id,row.name,row.extension,row.date,row.size,row.loaded);
          */
          this.$refs.Dictionary.addNewEntry(1,row.name,row.extension,row.date,row.size,row.loaded);
        }
        const currentTime = new Date().toLocaleTimeString();
        const message = `Update success at: ${currentTime}`;
        this.$refs.Dictionary.setAlertMessage(message);
      }
    },
    alertmsgDictionary(message){
      if(message)
      {
        this.$refs.Dictionary.setAlertMessage(message);
      }

    },
    resetEntry(){
      this.$refs.Dictionary.resetEntry();
    },
    alert(message){
      alert(message);
    },
    setToastMessage(message){
      this.$refs.Toast.setTest(message);
      this.$refs.Toast.showToast();
    },
    scrollToTop(elementId) {
      const element = document.getElementById(elementId); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>
