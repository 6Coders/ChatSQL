<template ref="Toast">
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="mr-auto">ChatSQL</strong>
    </div>
    <div class="toast-body">
    {{ Message }}
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
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
       * Shows a toast notification.
       */
      function showToast() {
        const toastEl = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

      /**
       * Sets the value of the Message variable to the specified message.
       *
       * @param {string} message - The message to set.
       */
      function setTest(message){
        Message.value=message;
      }
      
      return{
        showToast,
        setTest,
        Message
      }
    }
}
</script>