
<template>
<div id="app" class="container mt-6">
        <div class="row">
            <div class="col-md-6">
                <h1 class="display-2">Benvenuto</h1>
                <h2 class="text-body-secondary mb-5">Che tipo di utente sei?</h2>
                <div>
                  <button @click="redirectButton.onClick">{{ redirectButton.label }}</button>
                </div>
            </div>
            <div class="col-md-2">
            </div>
            <div class="col-md-4">
                <img src="../assets/logo.png" alt="Descrizione dell'immagine" class="img-fluid">
           </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RedirectButton from './RedirectButton';

export default defineComponent({
  data() {
    return {
      redirectButton: new RedirectButton('Prova', '/request') // Passa le tue etichette e i tuoi percorsi desiderati qui
    };
  }
});
</script>