<template>
    <button :class="UploadButtonClass" type="button" @click="uploadDictionary">Upload</button>
  </template>
  
  <script>
  export default {
    name: 'UploadButton',
    props: {
      UploadButtonClass: String
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