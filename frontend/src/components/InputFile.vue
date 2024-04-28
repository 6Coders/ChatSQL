<template>
<div>
  <div class="input-group">
    <input type="file" class="form-control" ref="fileInput" @change="handleFileUpload">
    <upload-button :class="uploadButtonClass" @upload-click="emitFile" :disabled="!file" />
  </div>
  <div v-if="isUploading">
    <div class="mt-2 d-flex align-items-center">
      <div class="spinner-border text-primary mr-3" role="status"></div>
        <p class="text-primary mb-0" style="margin-left: 10px;">Preparing Dictionary...</p> 
    </div>
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
    const message = ref('');
    const isUploading = ref(false);

    function handleFileUpload(event) {
      if (message.value != '') {
        message.value = '';
      }
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
      isUploading.value = false;
      message.value = newMessage;
    }

    return {
      file,
      message,
      handleFileUpload,
      emitFile,
      changeMessage
    };
  }
};
</script>
