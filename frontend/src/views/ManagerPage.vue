<template>
  <div class="container">
    <h1>Gestione dizionario dati</h1>
    <input-file ref="fileInput" @file-selected="handleFileSelected" :uploadButtonClass="uploadButtonClass"></input-file>
    <view-dictionary @load-button-clicked="handleLoadButtonClicked" @delete-button-clicked="handleDeleteButtonClicked"  :load-button-class="loadButtonClass" :delete-button-class="deleteButtonClass"></view-dictionary>
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
  methods: {
    handleFileSelected(file) {
      const message = VMManager.handleFileSelected(file);
      this.$refs.fileInput.changeMessage(message);
    },
    handleLoadButtonClicked(index) {
      console.log('LoadButton clicked for row index:', index);
      VMManager.handleLoadDictionary(index);
    },
    handleDeleteButtonClicked(index) {
      console.log('DeleteButton clicked for row index:', index);
      VMManager.handleDeleteDictionary(index);
    }
  }
};
</script>
