<template>
  <div class="container mt-5">
    <h1 class="display-2">Manager Page</h1>
    <h3 class="mt-4">Dizionario dati attualmente caricato: prova</h3>
    <input-file @file-selected="handleFileSelected" :inputFileClass="inputFileClass" :uploadClass="uploadClass"></input-file>
    <p>{{ errorMessages }}</p>
    <view-dictionary @load-button-clicked="handleLoadButtonClicked" @delete-button-clicked="handleDeleteButtonClicked"  :load-button-class="loadButtonClass" :delete-button-class="deleteButtonClass"></view-dictionary>
  </div>

  <div class="container-fluid fixed-bottom mb-5 ml-5">
    <RedirectButton :buttonClass="buttonClass" :destination="destinationHome">Torna alla home</RedirectButton>
  </div>
</template>

<script>
import RedirectButton from '@/components/RedirectButton.vue';
import InputFile from '@/components/InputFile.vue';
import ViewDictionary from '@/components/ViewDictionary.vue';
import VMManager from '../viewmodel/VMManager.js';

export default {
  components: {
    RedirectButton,
    InputFile,
    ViewDictionary
  },
  data() {
    return {
      errorMessages: '',
      destination: '/',

      //ASPETTO COMPONENTI
      buttonClass: 'btn btn-secondary',
      loadButtonClass: 'btn btn-success mt-auto',
      deleteButtonClass: 'btn btn-danger mt-auto',
      inputFileClass: 'form-control',
      uploadClass: 'btn btn-primary ms-3'
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
