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

    <div class="row mt-5">
      <div class="col-md-6">
        <label for="inputText" class="form-label">Inserisci del testo:</label>
        <InputRequest v-model="requestMessage"/>
      </div>
      <div class="col-md-6">
        <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" />
      </div>
    </div>

    <!-- Seconda riga per il "Prompt generato" -->
    <div class="row mt-4">
      <div class="col-md-12">
        <h2>Prompt generato</h2>
        <ViewGeneratedPrompts :messages="messages" />
      </div>
    </div>

  </div>

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
      buttonClass: "btn btn-secondary",
      destinationHome: "/"
    }
  }
}
</script>