<template>
  <div class="d-flex flex-column vh-100">
    <!-- Messaggi chat -->
    <div class="overflow-auto mt-5 flex-grow-1 px-5">
      <ViewGeneratedPrompts :messages="requestStore.messages" :status="requestStore.isSending" />
    </div>

    <!-- Input per l'utente -->
    <div class="input-group mt-5 px-5 pb-5 bg-white rounded">
      <input type="text" class="form-control" v-model="requestStore.requestMessage" name="requestMessage" autocomplete="off" placeholder="Inserisci un prompt qui...">
      <SendRequestButton :submitMethod="submitForm" :stopSubmitMethod="stopSending" :sendButtonClass="sendButtonClass"
        :stopSendButtonClass="stopSendButtonClass" :status="requestStore.isSending" />
      <div class="w-100 text-center mt-2">
        <small>Dizionario dati caricato: <b>prova</b></small>
        <small class="d-block">Made by <a href="">6Coders</a></small>
      </div>
    </div>
    
  </div>
</template>

<script>
import SendRequestButton from '@/components/SendRequestButton.vue'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'
import RequestPageViewModel from '@/viewmodel/VMRequest'

export default {
  name: 'RequestPage',
  components: {
    SendRequestButton,
    ViewGeneratedPrompts
  },
  setup() {
    const {
      requestStore, submitForm, stopSending
    } = RequestPageViewModel()

    return {
     requestStore,
      submitForm,
      stopSending,

      /*ASPETTO COMPONENTI*/
      //redirect button
      buttonClass: "btn btn-secondary rounded-0 rounded-end",

      //send button
      sendButtonClass: "btn btn-primary rounded-0 rounded-end",
      stopSendButtonClass: "btn btn-warning rounded-0 rounded-end",

      //input request
      requestClass: "form-control"
    }
  }
}
</script>