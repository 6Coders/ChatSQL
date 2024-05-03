<template>
  <!--
  This Vue.js component contains two buttons: one to send a request and one to stop the request.
  The send request button is only visible when the `status` is `false` and `disabled` is `false`.
  The stop request button is only visible when the `status` is `true`.
  -->
  <button :class="sendButtonClass" type="button" @click="submitMethod" v-if="!status" :disabled="disabled" >Send <i class="bi bi-send"></i></button>
  <button :class="stopSendButtonClass" type="button" title="Stop" @click="stopSubmitMethod" v-else>Stop <i class="bi bi-stop-circle"></i></button>
</template>

<script>
export default {
  name: 'SendRequestButton',
  props: {
    /**
     * CSS class for the send button.
     * @type {String}
     */
     sendButtonClass: String,
    /**
     * CSS class for the stop button.
     * @type {String}
     */
    stopSendButtonClass: String,
    /**
     * Method to execute when the send button is clicked.
     * @type {Function}
     */
    submitMethod: Function,
    /**
     * Method to execute when the stop button is clicked.
     * @type {Function}
     */
    stopSubmitMethod: Function,
    /**
     * Application status. If `true`, the stop button is displayed. If `false`, the send button is displayed.
     * @type {Boolean}
     */
    status: Boolean,
    /**
     * If `true`, the send button is disabled.
     * @type {Boolean}
     */
    disabled: Boolean
  }}
</script>