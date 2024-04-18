<template>
    <input v-model="requestMessage" name="requestMessage">
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const requestMessage = ref('')
  
      return {
        requestMessage
      }
    }
  }
  </script>