<template>
  <div ref="toast" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ Message }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" data-bs-dismiss="toast"></button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as bootstrap from 'bootstrap';

export default {
  name: 'ToastPopup',
  setup() {
    /**
     * Represents a reactive reference to a message.
     * @type {Ref<string>}
     */
    const Message = ref('');

    /**
     * Shows a toast message.
     */
    function showToast() {
      const toastEl = document.querySelector('.toast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }
    }

    /**
     * Sets the value of the Message variable to the specified message.
     *
     * @param {string} message - The message to set the Message variable to.
     */
    function setTest(message) {
      Message.value = message;
    }

    return {
      showToast,
      setTest,
      Message
    };
  }
};
</script>
