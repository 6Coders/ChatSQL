import { ref } from 'vue'

export default function RequestPageModel() {
  const requestMessage = ref('')
  const messages = ref([])

  const addMessage = (type, text) => {
    messages.value.push({ type, text })
  }

  return {
    requestMessage,
    messages,
    addMessage,
  }
}