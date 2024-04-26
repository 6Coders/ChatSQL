<template>
    <button :class="UploadButtonClass" type="button" @click="uploadDictionary" :disabled="disabled">Upload <i class="bi bi-cloud-arrow-up-fill"></i></button>
  </template>
  
  <script>
  export default {
    name: 'UploadButton',
    props: {
      UploadButtonClass: String,
      disabled: Boolean
    },
    setup(props, { emit }) {
  
      function uploadDictionary() {
        emit('upload-click');
      }
  
      return {
        uploadDictionary
      };
    }
    
  };
  </script>