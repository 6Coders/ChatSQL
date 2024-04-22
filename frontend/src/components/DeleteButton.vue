<template>
    <button @click="handleClick">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'DeleteButton',
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  };
  </script>