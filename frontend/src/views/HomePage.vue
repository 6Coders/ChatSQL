<template>
  <div class="container mt-5 px-5">
    <!--
    This Vue.js component is the home page of the application.
    It contains two cards: one for managing data dictionaries and one for making natural language requests.
    Each card has a title, a description, and a button that redirects to the corresponding page.
    -->
    <img src="../assets/6Coders-logo.png" alt="Logo" class="img-fluid mt-5 mb-5 mx-auto d-block" style="max-width: 100px;">
    <div class="row justify-content-center">
      <div class="col-md-6 mb-3">
        <div class="card h-100" data-cy="gestione-dizionario">
          <div class="card-body">
            <h2 class="card-title">Gestione dizionario dati</h2>
            <p class="card-text">Qui potrai visualizzare e gestire i dizionari dati caricati all'interno 
              dell'applicazione e decidere quello da utilizzare per la generazione del prompt, nonché caricarne di nuovi, oppure eliminare quelli già presenti
            </p>
            <RedirectButton :buttonClass="buttonClass" :destination="destinationManager" data-cy="gestione-dizionario-button">Vai alla pagina Manager <i class="bi bi-arrow-right"></i></RedirectButton>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card h-100" data-cy="chatsql">
          <div class="card-body">
            <h2 class="card-title">ChatSQL</h2>
            <p class="card-text">Qui potrai fare una richiesta in linguaggio naturale sui dati che vuoi ottenere, 
              la nostra applicazione trasformerà la tua richiesta in un prompt adatto, che potrai poi utilizzare per 
              ottenere una query in SQL 
            </p>
            <RedirectButton :buttonClass="buttonClass" :destination="destinationRequest" data-cy="chatsql-button">Vai alla pagina Request <i class="bi bi-arrow-right"></i></RedirectButton>
          </div>
        </div>
      </div>
    </div>
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
      /**
       * CSS class for the redirect buttons.
       * @type {String}
       */
       buttonClass: "btn btn-primary mt-auto",
      /**
       * Destination path for the "Manager" redirect button.
       * @type {String}
       */
      destinationManager: "/manager",
      /**
       * Destination path for the "Request" redirect button.
       * @type {String}
       */
      destinationRequest: "/request"
    };
  }
};
</script>