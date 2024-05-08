<template>
  <!--
  This Vue.js component is a button that redirects the user to a specified destination when clicked.
  The button's appearance can be customized with CSS classes.
  -->
  <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'RedirectButton',
  props: {
    /**
     * The destination path to redirect to when the button is clicked.
     * @type {String}
     */
    destination: String,
    /**
     * CSS class for the button.
     * @type {String}
     */
    buttonClass: String
  },
  setup(props) {
    /**
     * Vue Router instance for handling navigation.
     */
    const router = useRouter();

    /**
     * Handles the click event on the button.
     * It attempts to navigate to the `destination` prop.
     * If an error occurs during navigation, it is caught and logged to the console.
     */
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
}
</script>