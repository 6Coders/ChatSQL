<template>
    <button type="button" @click="submitForm" v-if="!isSending">Invia</button>
    <button type="button" title="Interrompi" @click="stopSending" v-else>Interrompi</button>
</template>
  
  <script>
  import { ref } from 'vue'
  import axios from 'axios'
  export default {
    name: 'SendRequestButton',
    props: ['requestMessage'],
    setup(props, { emit }) {
      const isSending = ref(false)
      const CancelToken = axios.CancelToken
      let cancel

      async function generatePrompt() {
        return new Promise((resolve, reject) => {
          axios.post('/generateprompt', { userRequest: props.requestMessage }, {
            cancelToken: new CancelToken(function executor(c) {
              cancel = c
            })
          })
            .then(response => {
              resolve(response.data.result);
            })
            .catch(error => {
              if (axios.isCancel(error)) {
                reject('Request canceled')
              } else {
                reject(error)
              }
            })
        })
      }
  
      async function submitForm() {
        isSending.value = true
        try {
          const responseMessage = await generatePrompt()
          emit('submit', responseMessage)
        } catch (error) {
            emit('submit', 'Stopped')
            console.error(error)
        } finally {
          isSending.value = false
        }
      }
  
      const stopSending = () => {
        if (cancel) {
          cancel('Request canceled')
        }
      }
  
      return {
        submitForm,
        stopSending,
        isSending
      }
    }
  }
  </script>