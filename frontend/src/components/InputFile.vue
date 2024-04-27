<template>
  <div class="input-group">
    <input type="file" class="form-control" ref="fileInput" @change="handleFileUpload">
    <upload-button :class="uploadButtonClass" @upload-click="emitFile" :disabled="!file" />
  </div>
  <p>{{ message }}</p>
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

    function handleFileUpload(event) {
      if (message.value != '') {
        message.value = '';
      }
      file.value = event.target.files[0];
      console.log('File inserito:', file.value);
    }

    function emitFile() {
      if (file.value) {
        emit('file-selected', file.value);
      } else {
        message.value = 'Nessun file selezionato';
      }
    }

    function changeMessage(newMessage) {
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
