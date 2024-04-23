<template>
  <div>
    <h1>Manager Page</h1>
    <p>Contenuto della pagina di richiesta...</p>
    <input-file ref="fileInput" @file-selected="handleFileSelected"></input-file>
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
      loadButtonClass: 'btn btn-primary mt-auto',
      deleteButtonClass: 'btn btn-primary mt-auto'
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
