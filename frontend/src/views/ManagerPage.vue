<template>
  <div>
    <h1>Manager Page</h1>
    <p>Contenuto della pagina di richiesta...</p>
    <input-file @file-selected="handleFileSelected"></input-file>
    <p>{{ errorMessages }}</p>
    <view-dictonary></view-dictonary>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';
import ViewDictonary from '@/components/ViewDictionary.vue';
import VMManager from '../viewmodel/VMManager.js';

export default {
  components: {
    InputFile,
    ViewDictonary
  },
  data() {
    return {
      errorMessages: ''
    };
  },
  methods: {
    handleFileSelected(file) 
    {
      this.resetFields('');
      VMManager.handleFileSelected(file, this.handleFileError, this.resetFields);
    },
    handleFileError(errorMessage) 
    {
      this.errorMessages = errorMessage;
    },
    resetFields() 
    {
      this.errorMessages = '';
    }
  }
};
</script>
