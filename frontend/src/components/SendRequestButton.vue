<template>
    <button @click="sendMessage">
      <slot></slot>
    </button>
  </template>
  
  <script>  
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    },
    setup() {
      async function sendMessage() {
        
      }

      return {
        sendMessage
      }
    }
  }
  </script>