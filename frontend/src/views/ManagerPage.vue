<template>
  <div>
    <h1>Manager Page</h1>
    <p>Contenuto della pagina di richiesta...</p>
    <input-file @file-selected="handleFileSelected"></input-file>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';
import VMManager from '../viewmodel/VMManager.js';

export default {
  components: {
    InputFile
  },
  methods: {
    handleFileSelected(file) {
      console.log('File selezionato:', file);
      VMManager.handleFileSelected(file);
    }
  }
};
</script>