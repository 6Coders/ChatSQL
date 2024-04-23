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
    <h2>Chat richieste</h2>

    <!-- Messaggi chat -->
    <div class=" bg-light p-3 rounded overflow-auto" style="max-height: 300px; height: 300px">
      <ViewGeneratedPrompts :messages="messages" />
    </div>

    <!-- Input per l'utente -->
    <div class="input-group mt-3">
       <InputRequest v-model="requestMessage" :requestClass="requestClass"/>
       <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" :sendButtonClass="sendButtonClass" :stopSendButtonClass="stopSendButtonClass"/>
    </div>
  </div>

  <!-- bottone home-->
  <div class="container-fluid fixed-bottom mb-5 ml-5">
    <RedirectButton :buttonClass="buttonClass" :destination="destinationHome">Torna alla home</RedirectButton>
  </div>
</template>

<script>
import InputRequest from '@/components/InputRequest.vue'
import SendRequestButton from '@/components/SendRequestButton.vue'
import RedirectButton from '@/components/RedirectButton.vue'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'
import RequestPageViewModel from '@/viewmodel/VMRequest'

export default {
  name: 'RequestPage',
  components: {
    InputRequest,
    RedirectButton,
    SendRequestButton,
    ViewGeneratedPrompts
  },
  setup() {
    const { requestMessage, messages, handleMessage } = RequestPageViewModel()

    return {
      requestMessage,
      messages,
      handleMessage,
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