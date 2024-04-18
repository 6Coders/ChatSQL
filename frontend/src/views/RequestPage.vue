<template>
  <div>
    <h1>Request Page</h1>

    <ul>
      <li v-for="(message, index) in messages" :key="index">
        {{ message }}
      </li>
    </ul>

    <form @submit.prevent="submitForm">
      <input v-model="requestMessage" name="requestMessage">
      <button type="submit" v-if="!isSending">Send Message</button>
      <button type="button" v-else @click="stopSending">Ferma</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const requestMessage = ref('')
    const messages = ref([])
    const isSending = ref(false)
    let shouldStop = false

    const simulateAsyncCall = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldStop) {
            reject('Stopped')
          } else {
            resolve('Richiesta inviata: ')
          }
        }, 2000)
      })
    }

    const submitForm = async () => {
      isSending.value = true
      const sentMessage = 'Invio richiesta: ' + requestMessage.value
      messages.value.push(sentMessage, 'Loading...')
      shouldStop = false
      try {
        const responseMessage = await simulateAsyncCall()
        messages.value[messages.value.length - 1] = responseMessage + sentMessage
      } catch (error) {
        messages.value.pop()
      }
      isSending.value = false
      requestMessage.value = ''
    }

    const stopSending = () => {
      shouldStop = true
    }

    return {
      requestMessage,
      messages,
      submitForm,
      isSending,
      stopSending
    }
  }
}
</script>
