<template>
  <button :buttonClass="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'RedirectButton',
  props: {
    destination: String,
    buttonClass: String
  },
  setup(props) {
    const router = useRouter();

    function handleClick() {
      try {
        router.push({ path: props.destination });
      } catch (error) {
        console.error(error);
      }
    }

    return {
      handleClick,
      router
    };
  }
};
</script>
