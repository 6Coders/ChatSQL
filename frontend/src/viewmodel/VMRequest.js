import RequestPageModel from '@/model/MRequest'
import axios from 'axios'

export default function RequestPageViewModel() {
  const { 
    requestMessage, 
    messages, 
    addMessage, 
    CancelToken,
    cancelObj,
    isSending,
   } = RequestPageModel()

  const handleMessage = (responseMessage) => {
    if (responseMessage != 'Stopped') {
      addMessage('user', requestMessage.value)
      addMessage('response', responseMessage)
    }else{
      addMessage('user', requestMessage.value)
      addMessage('response', 'errore o stoppato') //il messaggio è di prova per test
    }
    requestMessage.value = ''
  }

  async function generatePrompt() {
    return new Promise((resolve, reject) => {
      axios.post('/generateprompt', { userRequest: requestMessage.value }, {
        cancelToken: new CancelToken(function executor(c) {
          cancelObj.cancel = c
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get('https://catfact.ninja/fact')
        .then((response) => {
          resolve(response.data.fact);
        })
        .catch((error) => {
          reject(error);
        });
    }, 2000); // delay of 2 seconds
  });
}


  async function submitForm() {
    isSending.value = true
    try {
      const result = await testCall()
      handleMessage(result)
    } catch (error) {
      handleMessage('Stopped')
      console.error(error)
    } finally {
      isSending.value = false
    }
  }

  function stopSending() {
    if (cancelObj.cancel) {
      cancelObj.cancel()
    }
  }



  return {
    requestMessage,
    messages,
    handleMessage,
    generatePrompt,
    testCall,
    submitForm,
    stopSending,
  }
}