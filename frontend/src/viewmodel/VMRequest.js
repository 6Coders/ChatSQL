import axios from 'axios'
import { requestPageStore } from '@/stores/requestStore'

export default function RequestPageViewModel() {
  const requestStore = requestPageStore()

  const handleMessage = (responseMessage) => {
    if (responseMessage != 'Stopped') {
      requestStore.addMessage('user', requestStore.requestMessage)
      requestStore.addMessage('response', responseMessage)
    }else{
      requestStore.addMessage('user', requestStore.requestMessage)
      requestStore.addMessage('response', 'errore o stoppato') //il messaggio è di prova per test
    }
    requestStore.setRequestMessage('')
  }

  async function generatePrompt() {
    return new Promise((resolve, reject) => {
      axios.post('/generateprompt', { userRequest: requestStore.requestMessage.value }, {
        cancelToken: new requestStore.CancelToken(function executor(c) {
          requestStore.cancelObj.cancel = c
        })
      })
        .then(response => {
          resolve(response.data.result)
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

  // funzione di test per vedere se axios funziona
  async function testCall() {
    const cancelTokenSource = axios.CancelToken.source()
    requestStore.setCancelTokenSource(cancelTokenSource)
  
    try {
      const response = await axios.get( 'https://catfact.ninja/fact', {
        cancelToken: cancelTokenSource.token
      })
      return response.data.fact
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message)
        return 'Stopped'
      } else {
        return 'Error'
      }
    }
  }


  async function submitForm() {
    requestStore.setIsSending(true)
    console.log(requestStore.isSending)
    try {
      const result = await testCall()
      handleMessage(result)
    } catch (error) {
      handleMessage('Stopped')
      console.error(error)
    } finally {
      requestStore.setIsSending(false)
    }
  }

  function stopSending() {
    if (requestStore.cancelTokenSource) {
      requestStore.cancelTokenSource.cancel('Request cancelled.')
      requestStore.setCancelTokenSource(null)
    }
  }



  return {
    requestStore,
    submitForm,
    stopSending,
    generatePrompt
  }
}