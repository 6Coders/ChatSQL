<template>
    <GenericButton :buttonClass="buttonClass" @clicked="handleClick">
      <slot></slot>
    </GenericButton>
  </template>
  
  <script>
  import GenericButton from "./GenericButton.vue";
  
  export default {
    components: {
      GenericButton
    },
    props: {
      buttonClass: {
        type: String,
        default: "generic-button"
      },
      destination: {
        type: String,
        required: true 
      }
    },
    methods: {
      handleClick() {
        window.location.href = this.destination;
      }
    }
  };
</script>
  