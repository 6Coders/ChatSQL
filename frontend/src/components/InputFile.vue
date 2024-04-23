<template>
  <div class="d-flex">
    <input :class="inputFileClass" type="file" ref="fileInput" @change="handleFileUpload">
    <input :class="uploadClass" type="button" value="Upload" @click="emitFile">
  </div>
</template>

<script>
export default {
  name: 'InputFile',
  props:{
    //props per la grafica
    inputFileClass: String,
    uploadClass: String
  },
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
