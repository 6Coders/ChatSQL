<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div v-if="messages.length === 0" class="text-center text-black py-10"  style="margin: 100px;">
      <img src="../assets/6Coders-logo-original.png" alt="Logo" class="img-fluid" style="max-width: 100px;">
      <h4 class="mt-5">Come ti possiamo aiutare?</h4>
    </div>
    <div v-else class="w-100 text-black">
    <div v-for="(message, index) in messages" :key="index" class="border-bottom">
      <div v-if="message.type === 'user'" class="w-100 p-3 text-black">
        <i class="bi bi-person-fill me-2"></i>
        <strong>User</strong>
        <p>{{ message.text }}</p>
      </div>
      <div v-else-if="message.type === 'response'" class="w-100 p-3 text-black bg-light">
        <i class="bi bi-robot me-2"></i>
        <strong>Response</strong>
        <p>{{ message.text }}</p>
        <i class="bi bi-clipboard me-2 copy-icon" @click="copyToClipboard(message.text)"></i>
      </div>
      
    </div>   
    <div v-if="status" class="w-100 text-center text-black">
      <div class="spinner-border text-primary mt-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div> 
  </div>
</template>

<script>
export default {
  name: 'ViewGeneratedPrompts',
  props: {
    messages: {
      type: Array,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text)
    }

    return {
      copyToClipboard
    }
  }
}
</script>

<style scoped>
.copy-icon {
  color: #333;
  cursor: pointer;
}

.copy-icon:hover {
  color: #007BFF;
}
</style>