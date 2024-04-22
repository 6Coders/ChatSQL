<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'LoadButton',  
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>