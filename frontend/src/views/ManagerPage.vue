<template>
  <div class="container">
    <h1 id="top">Gestione dizionario dati</h1>
    <input-file ref="fileInput" @file-selected="handleFileSelected" :uploadButtonClass="uploadButtonClass"/>
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
    /**
     * Handles the event when the delete button is clicked.
     * @param {number} index - The index of the item to be deleted.
     */
    handleDeleteButtonClicked(index) {
      if(index)
        VMManager.handleDeleteDictionary(index);
    },

    /**
     * Handles the update of an entry.
     * Calls the `handleDictionary` method of the `VMManager` object.
     */
    handleUpdateEntry(){
      VMManager.handleDictionary();
    },

    /**
     * Prints the dictionary entries based on the provided response.
     * 
     * @param {Array} response - The response containing the dictionary entries.
     */
    printDictionary(response) {
      if(response && response.length > 0)
      {
        for(const row of response)
        {
          /*
          Sotituire appena ci sarà la funzionalità nel backend
          this.$refs.Dictionary.addNewEntry(row.id,row.name,row.extension,row.date,row.size,row.loaded);
          */
          this.$refs.Dictionary.addNewEntry(1,row.name,row.extension,row.date,row.size,row.loaded);
        }
      }
    },

    /**
     * Sets the isRefreshingStop flag to stop refreshing the dictionary.
     */
    setIsRefreshingStop(){
      this.$refs.Dictionary.isRefreshingStop();
    },

    /**
     * Sets the alert message for the ManagerPage component.
     * 
     * @param {string} message - The message to be set as the alert message.
     */
    setAlertMessage(message){
      if(message)
        this.$refs.Dictionary.setAlertMessage(message);
    },

    /**
     * Resets the entry by calling the `resetEntry` method of the `Dictionary` component.
     */
    resetEntry(){
      this.$refs.Dictionary.resetEntry();
    },

    setToastMessage(message){
      this.$refs.Toast.setTest(message);
      this.$refs.Toast.showToast();
    },

    /**
     * Shows a toast message.
     * Calls the `showToast` method of the `Toast` component referenced by `$refs`.
     */
    showToast(){
      this.$refs.Toast.showToast();
    },

    /**
     * Scrolls the page to the specified element.
     * @param {string} elementId - The ID of the element to scroll to.
     */
    scrollTo(elementId) {
      const element = document.getElementById(elementId); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  }
};
</script>
