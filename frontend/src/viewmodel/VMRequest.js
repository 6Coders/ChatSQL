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

  async function submitForm() {
    requestStore.setIsSending(true)
    console.log(requestStore.isSending)
    try {
      const result = await requestStore.testApiCall()
      handleMessage(result)
    } catch (error) {
      handleMessage('Stopped')
      console.error(error)
    } finally {
      requestStore.setIsSending(false)
    }
  }

  function stopSending() {
    requestStore.cancelRequest()
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