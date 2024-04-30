<template>
<div>
  <div class="input-group">
    <input type="file" class="form-control" ref="fileInput" @change="handleFileUpload">
    <upload-button ref="uploadbtn" :class="uploadButtonClass" @upload-click="emitFile" :disabled="!file" :isuploading="isUploading" />
  </div>
  <p>{{ message }}</p>
</div>
</template>

<script>
import { ref } from 'vue';
import UploadButton from '@/components/UploadButton.vue';

export default {
  name: 'InputFile',
  components: {
    UploadButton
  },
  props: {
    uploadButtonClass: String
  },
  setup(props, { emit }) {
    const file = ref(null);
    const message = ref(' ');
    const isUploading = ref(false);

    function handleFileUpload(event) {
      this.changeMessage('');
      file.value = event.target.files[0];
      console.log('File inserito:', file.value);
    }

    function emitFile() {
      if (file.value) 
      {
        isUploading.value = true;
        emit('file-selected', file.value);
      } 
    }

    function changeMessage(newMessage) 
    {
      message.value = newMessage;
    }

    function setIsUploading(value) 
    {
      isUploading.value = value;
    }

    return {
      file,
      message,
      handleFileUpload,
      emitFile,
      changeMessage,
      isUploading,
      setIsUploading
    };
  }
};
</script>
