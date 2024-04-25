<template>
  <button :class="sendButtonClass" type="button" @click="submitMethod" v-if="!status">Invia</button>
  <button :class="stopSendButtonClass" type="button" title="Interrompi" @click="stopSubmitMethod" v-else>Interrompi</button>
</template>

<script>
export default {
  name: 'SendRequestButton',
  props: {
    sendButtonClass: String,
    stopSendButtonClass: String,
    submitMethod: Function,
    stopSubmitMethod: Function,
    status: {
      type: Boolean,
      default: false
    }
  }}
</script>