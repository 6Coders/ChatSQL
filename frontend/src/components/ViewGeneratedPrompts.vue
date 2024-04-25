<template>
    <ul class="list-unstyled">
      <li v-for="(message, index) in messages" :key="index">
        <span v-if="message.type === 'user'" class="bg-info">User: {{ message.text }} </span>
        <span v-else-if="message.type === 'response'" class="bg-dark text-white">Response: {{ message.text }} </span>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: 'ViewGeneratedPrompts',
    props: {
      messages: {
        type: Array,
        required: true
      }
    }
  }
  </script>