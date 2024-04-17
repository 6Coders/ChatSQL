<template>
      <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>
  
<script>
  export default {
    props: {
      buttonClass: {
        type: String,
        default: "generic-button" 
      }
    },
    methods: {
      handleClick() {
        this.$emit("clicked");
      }
    }
  };
</script>