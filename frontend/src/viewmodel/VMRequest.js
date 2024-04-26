import { useRequestStore } from '@/stores/requestStore'
import useRequestModel from '@/model/MRequest'

export default function RequestPageViewModel() {
  const requestStore = useRequestStore()
  const { testApiCall, cancelRequest } = useRequestModel()
  
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

  const submitForm = async () => {
    requestStore.setIsSending(true)
    try {
      const result = await testApiCall()
      handleMessage(result)
    } catch (error) {
      handleMessage('Stopped')
      console.error(error)
    } finally {
      requestStore.setIsSending(false)
    }
  }

  function stopSending() {
    cancelRequest()
  }

  function clearMessages() {
    requestStore.clearMessages()
  }

  return {
    requestStore,
    submitForm,
    stopSending,
    clearMessages
  }
}