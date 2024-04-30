<template ref="uploadbtn">
    <button :class="UploadButtonClass" type="button" @click="uploadDictionary" :disabled="disabled">Upload 
      <i v-if="!isuploading" class="bi bi-cloud-arrow-up-fill"></i>
      <span v-else class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    </button>
  </template>
  
  <script>

  export default {
    name: 'UploadButton',
    props: {
      UploadButtonClass: String,
      disabled: Boolean,
      isuploading: Boolean
    },
    setup(props, { emit }) {

      function uploadDictionary() {
        emit('upload-click');
      }

      return {
        uploadDictionary,
      };
    }
    
  };
  </script>