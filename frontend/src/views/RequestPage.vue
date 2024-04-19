<template>
  <div>
    <h1>Request Page</h1>

    <ViewGeneratedPrompts :messages="messages" />
    <InputRequest v-model="requestMessage"/>
    <SendRequestButton :requestMessage="requestMessage" @submit="handleMessage" />
  </div>
</template>

<script>
import InputRequest from '@/components/InputRequest.vue'
import SendRequestButton from '@/components/SendRequestButton.vue'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'
import RequestPageViewModel from '@/viewmodel/VMRequest'

export default {
  name: 'RequestPage',
  components: {
    InputRequest,
    SendRequestButton,
    ViewGeneratedPrompts
  },
  setup() {
    const { requestMessage, messages, handleMessage } = RequestPageViewModel()

    return {
      requestMessage,
      messages,
      handleMessage,
    }
  }
}
</script>