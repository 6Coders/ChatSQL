<template>
  <div>
    <h1>Request Page</h1>

    <MessageList :messages="messages" />
    <RequestInput v-model="requestMessage"/>
    <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" />
  </div>
</template>

<script>
import { ref } from 'vue'
import RequestInput from '@/components/RequestInput.vue'
import SendRequestButton from '@/components/SendRequestButton.vue'
import MessageList from '@/components/MessageList.vue'

export default {
  components: {
    RequestInput,
    SendRequestButton,
    MessageList
  },
  setup() {
    const requestMessage = ref('')
    const messages = ref([])

    const handleMessage = (responseMessage) => {
      if (responseMessage != 'Stopped') {
        messages.value.push({
          type: 'user',
          text: requestMessage.value
        })
        messages.value.push({
          type: 'response',
          text: responseMessage
        })
      }
    }

    return {
      requestMessage,
      messages,
      handleMessage,
    }
  }
}
</script>