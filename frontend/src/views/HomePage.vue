<template>
    <div>
      <p>Manager page<RedirectButton :buttonClass="buttonClass" :destination="destinationManager">Vai alla pagina Manager</RedirectButton></p>
      <p>Request page<RedirectButton :buttonClass="buttonClass" :destination="destinationRequest">Vai alla pagina Request</RedirectButton></p>
    </div>
</template>
  
  <script>
  import RedirectButton from "../components/RedirectButton.vue";
  
  export default {
    components: {
      RedirectButton
    },
    setup() {
      return {
        buttonClass: "specific-button",
        destinationManager: "/manager",
        destinationRequest: "/request"
      };
    }
  };
  </script>
  