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
  
  const submitForm = async () => {
    requestStore.setIsSending(true)
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