<template>
  <div>
    <h1>Manager Page</h1>
    <p>Contenuto della pagina di richiesta...</p>
    <input-file @file-selected="handleFileSelected"></input-file>
    <p>{{ errorMessages }}</p>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';
import VMManager from '../viewmodel/VMManager.js';

export default {
  components: {
    InputFile
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
