<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileUpload">
    <input type="button" value="Upload" @click="emitFile">
  </div>
</template>

<script>
export default {
  name: 'InputFile',
  data() {
    return {
      file: null
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log('File inserito:', this.file);
    },
    emitFile() {
      if (this.file) 
      {
        this.$emit('file-selected', this.file);
      } else 
      {
        console.error('Nessun file selezionato');
      }
    }
  }
}
</script>
