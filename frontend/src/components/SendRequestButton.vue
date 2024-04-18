<template>
    <button type="button" @click="submitForm" v-if="!isSending">Send Message</button>
    <button type="button" @click="stopSending" v-else>Ferma</button>
</template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    props: ['requestMessage'],
    setup(props, { emit }) {
      const isSending = ref(false)
      let shouldStop = false
  
      const simulateAsyncCall = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (shouldStop) {
              reject('Stopped')
            } else {
              //resolve('Richiesta inviata: ' + props.requestMessage)
              resolve('Ricevuto')
            }
          }, 2000)
        })
      }
  
      async function submitForm() {
        isSending.value = true
        shouldStop = false
        try {
          const responseMessage = await simulateAsyncCall()
          emit('submit', responseMessage)
          console.log(responseMessage)
        } catch (error) {
            emit('submit', 'Stopped')
            console.error(error)
        } finally {
          isSending.value = false
        }
      }
  
      const stopSending = () => {
        shouldStop = true
      }
  
      return {
        submitForm,
        stopSending,
        isSending
      }
    }
  }
  </script>