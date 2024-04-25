<template>
<!--<div>
    <h1>Request Page</h1>

    <ViewGeneratedPrompts :messages="messages" />
    <InputRequest v-model="requestMessage"/>
    <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" />
    <p>Torna alla home<RedirectButton :buttonClass="buttonClass" :destination="destinationHome">Torna alla home</RedirectButton></p>
</div>-->
  <div class="container mt-5">
    <h1 class="display-2">Generazione Prompt</h1>
    <h3 class="mt-4">Dizionario dati caricato: prova</h3>

  </div>
  <div class="container mt-5">
    <h1>Chat richieste</h1>
    <!-- Messaggi chat -->
    <div class="overflow-auto flex-grow-1 px-md-5 mb-5 chat-height">
      <ViewGeneratedPrompts :messages="requestStore.messages" :status="requestStore.isSending" />
    </div>

    <!-- Input per l'utente -->
    <div class="input-group mt-3">
       <input type="text" class="form-control" v-model="requestMessage" name="requestMessage">
       <SendRequestButton :submitMethod="submitForm" :stopSubmitMethod="stopSending" :sendButtonClass="sendButtonClass" :stopSendButtonClass="stopSendButtonClass" :status="isSending"/>
    </div>
  </div>

  <!-- bottone home-->
  <div class="container-fluid fixed-bottom mb-5 ml-5">
    <RedirectButton :buttonClass="buttonClass" :destination="destinationHome">Torna alla home</RedirectButton>
  </div>
</template>

<script>
import SendRequestButton from '@/components/SendRequestButton.vue'
import RedirectButton from '@/components/RedirectButton.vue'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'
import RequestPageViewModel from '@/viewmodel/VMRequest'

export default {
  name: 'RequestPage',
  components: {
    RedirectButton,
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
      buttonClass: "btn btn-secondary",

      //send button
      sendButtonClass: "btn btn-primary",
      stopSendButtonClass: "btn btn-warning",

      //input request
      requestClass: "form-control"
    }
  }
}
</script>

<style scoped>
.chat-height {
  height: calc(100vh - 275px);
}
@media (min-width: 768px) {
  .no-border-radius {
    border-radius: 0;
  }
  .chat-height {
    height: calc(100vh - 200px);
  }
}
</style>
