<template>
  <div class="container">
    <h1 id="top" data-cy="manager-page-title">Gestione dizionario dati</h1>
    <input-file ref="fileInput" @file-selected="handleFileSelected" :uploadButtonClass="uploadButtonClass" data-cy="file-input"/>
    <toast-popup ref="Toast" id="toast" data-cy="toast-popup"/> 
    <view-dictionary ref="Dictionary" @load-button-clicked="handleLoadButton" @delete-button-clicked="handleDeleteButtonClicked" @update-entry="handleUpdateEntry"  :load-button-class="loadButtonClass" :delete-button-class="deleteButtonClass" data-cy="view-dictionary"/>  
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
    /**
     * @property {string} loadButtonClass - The CSS class for the load button.
     * @property {string} deleteButtonClass - The CSS class for the delete button.
     * @property {string} uploadButtonClass - The CSS class for the upload button.
     */

    /**
     * Returns the initial data object for the ManagerPage component.
     * @returns {ManagerPageData} The initial data object.
     */
    return {
      loadButtonClass: 'btn btn-success',
      deleteButtonClass: 'btn btn-danger',
      uploadButtonClass: 'btn btn-outline-secondary',
    };
  },
  mounted() 
  {
    /**
     * Sets the Vue component for the VMManager.
     * 
     * @param {Object} component - The Vue component to set.
     */
    VMManager.setVueComponent(this);
    this.handleUpdateEntry();
  },
  methods: {

    /**
     * Handles the selection of a file.
     * 
     * @param {File} file - The selected file.
     */
    handleFileSelected(file) {
      VMManager.handleFileSelected(file);
    },

    /**
     * Handles the click event when the load button is clicked.
     * Calls the `handleLoadDictionary` method of the `VMManager` object with the specified index.
     *
     * @param {number} index - The index of the dictionary to load.
     */
    handleLoadButton(index) {
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
        for(const row of response)
          this.$refs.Dictionary.addNewEntry(row.name,row.extension,row.date,row.size,row.loaded);
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

    /**
     * Sets the toast message.
     * 
     * @param {string} message - The message to be displayed in the toast.
     */
    setToastMessage(message){
      if(message)
        this.$refs.Toast.setTest(message);
    },

    /**
     * Sets the value of `isUploading` for the file input component.
     * 
     * @param {boolean} isUploading - The new value of `isUploading`.
     */
    setIsUploading(isUploading){
      this.$refs.fileInput.setIsUploading(isUploading);
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
