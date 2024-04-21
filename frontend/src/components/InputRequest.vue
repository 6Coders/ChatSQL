<template>
    <input :class="requestClass" v-model="requestMessage" name="requestMessage">
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'InputRequest',
    props:{
      requestClass: String,
    },
    setup() {
      const requestMessage = ref('')
  
      return {
        requestMessage
      }
    }
  }
  </script>