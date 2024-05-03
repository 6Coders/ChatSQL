import { useRequestStore } from '@/stores/requestStore'
import useRequestModel from '@/model/MRequest'

/**
 * RequestPageViewModel is a factory function that returns an object with a method: submitForm.
 * 
 * @returns {Object} An object with a method: submitForm.
 */
export default function RequestPageViewModel() {
  const requestStore = useRequestStore()
  const { generatePrompt, cancelRequest } = useRequestModel()

  /**
   * handleMessage adds a user and a response message to the messages array in the requestStore.
   * 
   * @param {string} responseMessage - The response message.
   */
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

  /**
   * submitForm sets the isSending state to true, generates a prompt with the current request message, handles the result, and then sets the isSending state to false.
   */
  const submitForm = async () => {
    requestStore.setIsSending(true)
    try {
      const result = await generatePrompt(requestStore.requestMessage)
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
    clearMessages,
    handleMessage
  }
}