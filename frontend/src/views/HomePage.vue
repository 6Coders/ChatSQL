<template>
    <div class="container text-center mt-5">
      <h1 class="display-2">Benvenuto</h1>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title text-center">Gestione dizionario dati</h2>
              <p class="card-text">Qui potrai visualizzare e gestire i dizionari dati caricati all'interno 
                dell'applicazione e decidere quello da utilizzare per la generazione del prompt, nonchè caricarne di nuovi, oppure eliminare quelli già presenti
              </p>
              <RedirectButton :buttonClass="buttonClass" :destination="destinationManager">Vai alla pagina Manager</RedirectButton>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title text-center">Generazione prompt</h2>
              <p class="card-text">Qui potrai fare una richiesta in linguaggio naturale sui dati che vuoi ottenere, 
                la nostra applicazione trasformerà la tua richiesta in un prompt adatto, che potrai poi utilizzare per 
                ottenere una query in SQL 
              </p>
              <RedirectButton :buttonClass="buttonClass" :destination="destinationRequest">Vai alla pagina Request</RedirectButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <img src="../assets/6Coders-logo.png" alt="Logo" class="img-fluid">
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
        buttonClass: "btn btn-primary mt-auto",
        destinationManager: "/manager",
        destinationRequest: "/request"
      };
    }
  };
  </script>
  