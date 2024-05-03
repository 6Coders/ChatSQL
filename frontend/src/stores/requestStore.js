import { defineStore } from 'pinia'

/**
 * useRequestStore is a factory function that defines a store with an id of 'request' and several actions.
 * 
 * @returns {Object} A store object with a state and several actions.
 */
export const useRequestStore = defineStore({
  id: 'request',
  state: () => ({
    requestMessage: '',
    messages: [],
    isSending: false,
  }),
  actions: {
    /**
     * addMessage adds a new message to the messages array.
     * 
     * @param {string} type - The type of the message.
     * @param {string} text - The text of the message.
     */
    addMessage(type, text) {
      this.messages.push({ type, text })
    },
    /**
     * setRequestMessage sets the requestMessage state.
     * 
     * @param {string} message - The new request message.
     */
    setRequestMessage(message) {
      this.requestMessage = message
    },
    /**
     * clearMessages clears all messages from the messages array.
     */
    clearMessages() {
      this.messages.splice(0, this.messages.length)
    },
    /**
     * setIsSending sets the isSending state.
     * 
     * @param {boolean} value - The new value for isSending.
     */
    setIsSending(value) {
      this.isSending = value
    }
  }
})