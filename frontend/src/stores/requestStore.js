import { defineStore } from 'pinia'

export const useRequestStore = defineStore({
  id: 'request',
  state: () => ({
    requestMessage: '',
    messages: [],
    isSending: false,
  }),
  actions: {
    addMessage(type, text) {
      this.messages.push({ type, text })
    },
    setRequestMessage(message) {
      this.requestMessage = message
    },
    clearMessages() {
      this.messages.splice(0, this.messages.length)
    },
    setIsSending(value) {
      this.isSending = value
    }
  }
})