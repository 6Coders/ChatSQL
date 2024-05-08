<template ref="uploadbtn">
  <button :class="UploadButtonClass" type="button" @click="uploadDictionary" :disabled="disabled">
    Upload
    <i v-if="!isuploading" class="bi bi-cloud-arrow-up-fill" />
    <span v-else class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
  </button>
</template>

<script>
export default {
  name: 'UploadButton',
  /**
   * Props for the UploadButton component.
   *
   * @prop {String} UploadButtonClass - The CSS class for the upload button.
   * @prop {Boolean} disabled - Indicates whether the upload button is disabled.
   * @prop {Boolean} isuploading - Indicates whether an upload is currently in progress.
   */
  props: {
    UploadButtonClass: String,
    disabled: Boolean,
    isuploading: Boolean
  },
  /**
   * Sets up the component and defines the uploadDictionary function.
   */
  setup(props, { emit }) {
    /**
     * Triggers the 'upload-click' event.
     */
    function uploadDictionary() {
      emit('upload-click');
    }

    return {
      uploadDictionary,
    };
  }
}
</script>