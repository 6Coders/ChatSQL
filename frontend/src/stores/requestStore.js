import { defineStore } from 'pinia'

export const requestPageStore = defineStore({
  id: 'request',
  state: () => ({
    requestMessage: '',
    messages: [],
    isSending: false,
    CancelTokenSource: null
  }),
  actions: {
    addMessage(type, text) {
      this.messages.push({ type, text })
    },
    setRequestMessage(message) {
      this.requestMessage = message
    },
    setIsSending(value) {
      this.isSending = value
    },
    setCancelTokenSource(source) {
      this.cancelTokenSource = source
    },
    cancelRequest() {
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel('Request cancelled.')
        this.setCancelTokenSource(null)
      }
    }
  }
})