<template>
  <div>
    <h1>Manager Page</h1>
    <p>Contenuto della pagina di richiesta...</p>
    <input-file @file-selected="handleFileSelected"></input-file>
    <p>{{ errorMessages }}</p>
    <view-dictionary @load-button-clicked="handleLoadButtonClicked" @delete-button-clicked="handleDeleteButtonClicked"  :load-button-class="loadButtonClass" :delete-button-class="deleteButtonClass"></view-dictionary>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';
import ViewDictionary from '@/components/ViewDictionary.vue';
import VMManager from '../viewmodel/VMManager.js';

export default {
  components: {
    InputFile,
    ViewDictionary
  },
  data() {
    return {
      errorMessages: '',
      loadButtonClass: 'btn btn-primary mt-auto',
      deleteButtonClass: 'btn btn-primary mt-auto'
    };
  },
  methods: {
    handleFileSelected(file) {
      this.resetFields('');
      VMManager.handleFileSelected(file, this.handleFileError, this.resetFields);
    },
    handleFileError(errorMessage) {
      this.errorMessages = errorMessage;
    },
    resetFields() {
      this.errorMessages = '';
    },
    handleLoadButtonClicked(index) {
      console.log('LoadButton clicked for row index:', index);

    },
    handleDeleteButtonClicked(index) {
      console.log('DeleteButton clicked for row index:', index);

    }
  }
};
</script>
