<template>
  <div>
    <h1>Request Page</h1>

    <ViewGeneratedPrompts :messages="messages" />
    <InputRequest v-model="requestMessage"/>
    <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" />
  </div>
</template>

<script>
import { ref } from 'vue'
import InputRequest from '@/components/InputRequest.vue'
import SendRequestButton from '@/components/SendRequestButton.vue'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'

export default {
  name: 'RequestPage',
  components: {
    InputRequest,
    SendRequestButton,
    ViewGeneratedPrompts
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