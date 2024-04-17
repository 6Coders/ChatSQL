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
      validator: value => {
        const validDestinations = ['/', '/request', '/manager'];
        if (!validDestinations.includes(value)) {
          console.error(`Invalid destination provided: ${value}`);
          return false; // Validation failed
        }
        return true; // Validation passed
      },
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
