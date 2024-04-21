import RequestPageModel from '@/model/MRequest'

export default function RequestPageViewModel() {
  const { requestMessage, messages, addMessage } = RequestPageModel()

  const handleMessage = (responseMessage) => {
    if (responseMessage != 'Stopped') {
      addMessage('user', requestMessage.value)
      addMessage('response', responseMessage)
    }else{
      addMessage('user', requestMessage.value)
      addMessage('response', 'errore o stoppato') //il messaggio è di prova per test
    }
  }

  return {
    requestMessage,
    messages,
    handleMessage,
  }
}