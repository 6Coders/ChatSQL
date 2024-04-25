import { ref } from 'vue'
import axios from 'axios'

export default function RequestPageModel() {
  const requestMessage = ref('')
  const messages = ref([])
  const isSending = ref(false)
  const CancelToken = axios.CancelToken
  const cancelObj = { cancel: null }

  const addMessage = (type, text) => {
    messages.value.push({ type, text })
  }

  return {
    requestMessage,
    messages,
    addMessage,
    isSending,
    CancelToken,
    cancelObj
  }
}