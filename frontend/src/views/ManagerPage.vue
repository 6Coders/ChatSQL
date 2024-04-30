<template>
  <div class="container">
    <h1>Gestione dizionario dati</h1>
    <input-file ref="fileInput" @file-selected="handleFileSelected" :uploadButtonClass="uploadButtonClass"></input-file>
    <view-dictionary ref="Dictionary" @load-button-clicked="handleLoadButtonClicked" @delete-button-clicked="handleDeleteButtonClicked" @update-entry="handleUpdateEntry"  :load-button-class="loadButtonClass" :delete-button-class="deleteButtonClass"></view-dictionary>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';
import ViewDictionary from '@/components/ViewDictionary.vue';
import VMManager from '@/viewmodel/VMManager.js';

export default {
  name: 'ManagerPage',
  components: {
    InputFile,
    ViewDictionary
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
      this.$refs.fileInput.changeMessage(message);
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
    }
  }
};
</script>
