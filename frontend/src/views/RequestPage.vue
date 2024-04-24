<template>
  <!--<div>
    <h1>Request Page</h1>

    <ViewGeneratedPrompts :messages="messages" />
    <InputRequest v-model="requestMessage"/>
    <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" />
    <p>Torna alla home<RedirectButton :buttonClass="buttonClass" :destination="destinationHome">Torna alla home</RedirectButton></p>
</div>-->
  <!-- <div class="container mt-5">
    <h1 class="display-2">Generazione Prompt</h1>
  </div> -->
  <div class="d-flex flex-column vh-100">
    <!-- Messaggi chat -->
    <div class="overflow-auto mt-5 flex-grow-1 px-5">
      <ViewGeneratedPrompts :messages="messages" />
    </div>

    <!-- Input per l'utente -->
    <div class="input-group mt-3 px-5 pb-5 bg-white rounded">
      <input type="text" class="form-control" v-model="requestMessage" name="requestMessage" autocomplete="off" placeholder="Inserisci un prompt qui...">
      <SendRequestButton :submitMethod="submitForm" :stopSubmitMethod="stopSending" :sendButtonClass="sendButtonClass"
        :stopSendButtonClass="stopSendButtonClass" :status="isSending" />
      <div class="w-100 text-center mt-2">
        <small>Dizionario dati caricato: <b>prova</b></small>
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
      requestMessage, messages, handleMessage, submitForm, stopSending, isSending
    } = RequestPageViewModel()

    return {
      requestMessage,
      messages,
      handleMessage,
      submitForm,
      stopSending,
      isSending,
      destinationHome: "/",

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