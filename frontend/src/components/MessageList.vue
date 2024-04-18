<template>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <span v-if="message.type === 'user'">User: </span>
        <span v-else-if="message.type === 'response'">Response: </span>
        {{ message.text }}
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: {
      messages: {
        type: Array,
        required: true
      }
    }
  }
  </script>