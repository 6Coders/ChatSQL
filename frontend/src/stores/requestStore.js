import { defineStore } from 'pinia'
import axios from 'axios'

export const useRequestStore = defineStore({
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
    clearMessages() {
      this.messages = []
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
    },
    async testApiCall() {
      const cancelTokenSource = axios.CancelToken.source()
      this.setCancelTokenSource(cancelTokenSource)
      try {
        const response = await axios.get('https://catfact.ninja/fact', {
          cancelToken: cancelTokenSource.token
        })
        return response.data.fact
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message)
          return 'Stopped'
        } else {
          return 'Error'
        }
      }
    },
    async generatePrompt() {
      return new Promise((resolve, reject) => {
        axios.post('/generateprompt', { userRequest: this.requestMessage }, {
          cancelToken: new this.CancelTokenSource(function executor(c) {
            this.cancelTokenSource.cancel = c
          })
        })
          .then(response => {
            resolve(response.data.result)
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              reject('Request canceled')
            } else {
              reject(error)
            }
          })
      })
    }
  }
})