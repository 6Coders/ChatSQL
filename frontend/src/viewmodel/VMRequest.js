import RequestPageModel from '@/model/MRequest'

export default function RequestPageViewModel() {
  const { requestMessage, messages, addMessage } = RequestPageModel()

  const handleMessage = (responseMessage) => {
    if (responseMessage != 'Stopped') {
      console.log('RequestPageViewModel.handleMessage')
      addMessage('user', requestMessage.value)
      addMessage('response', responseMessage)
    }
  }

  return {
    requestMessage,
    messages,
    handleMessage,
  }
}