<template>
  <button :class="sendButtonClass" type="button" @click="submitMethod" v-if="!status" :disabled="disabled" >Invia <i class="bi bi-send"></i></button>
  <button :class="stopSendButtonClass" type="button" title="Interrompi" @click="stopSubmitMethod" v-else>Interrompi <i class="bi bi-stop-circle"></i></button>
</template>

<script>
export default {
  name: 'SendRequestButton',
  props: {
    sendButtonClass: String,
    stopSendButtonClass: String,
    submitMethod: Function,
    stopSubmitMethod: Function,
    status: Boolean,
    disabled: Boolean
  }}
</script>