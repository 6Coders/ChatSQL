<template>
    <div>
      <input type="file" @change="handleFileUpload">
    </div>
</template>
  
<script>
  export default {
    name: 'InputFile',
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (this.isExtensionAllowed(file) && this.isSizeValid(file)) {
          console.log("Il file è valido.");
          this.$emit('file-selected', file);
        } else {
          console.error('Il file non è valido.');
          return false;
        }
      },
      isExtensionAllowed(file) {
        const allowedExtensions = ['.json'];
        const extension = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes('.' + extension);
      },
      isSizeValid(file) {
        const maxSize = 500 * 1024; 
        return file.size <= maxSize;
      }
    }
  }
</script>
  