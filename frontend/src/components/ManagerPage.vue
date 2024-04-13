<template>
    <div id="app" class="container mt-6">
            <div class="row">
                <div class="col-md-6">
                    <h1 class="display-2">Manager</h1>
                    <button @click="toHomeButton.onClick">{{ toHomeButton.label }}</button>
                </div>
            </div>
        </div>
    </template>


<script lang="ts">
import { ref } from 'vue';
import RedirectButton from './RedirectButton';
import { useRouter } from 'vue-router';

export default {
 name: 'ManagerPage',
 setup() {
  const router = useRouter();
    const toHomeButton = ref(new RedirectButton('Home', '/', router));
    return {
      toHomeButton,
    };
  }
}
</script>