
<template>
<div id="app" class="container mt-6">
        <div class="row">
            <div class="col-md-6">
                <h1 class="display-2">Benvenuto</h1>
                <h2 class="text-body-secondary mb-5">Che tipo di utente sei?</h2>
                <div>
                  <button @click="toRequestButton.onClick">{{ toRequestButton.label }}</button>
                  <button @click="toManagerButton.onClick">{{ toManagerButton.label }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import RedirectButton from './RedirectButton';
import { useRouter } from 'vue-router';

export default {
 setup() {
  const router = useRouter();
    const toRequestButton = ref(new RedirectButton('Utente', '/request', router));
    const toManagerButton = ref(new RedirectButton('Amministratore', '/manager', router));
    return {
      toRequestButton,
      toManagerButton,
    };
  }
}
</script>