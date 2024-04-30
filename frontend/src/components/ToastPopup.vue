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
      const Message = ref('');
      function showToast() {
        const toastEl = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

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