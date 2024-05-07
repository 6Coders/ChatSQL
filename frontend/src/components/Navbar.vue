<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 fixed-top">
    <router-link class="navbar-brand" to="/">ChatSQL</router-link>
    <button class="navbar-toggler" type="button" @click="isOpen = !isOpen" :aria-expanded="isOpen"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" :class="{ 'show': isOpen }" id="navbarNav">
      <ul class="navbar-nav">
        <!--
        Home page route.
        -->
        <li class="nav-item">
          <router-link v-slot="{ navigate }" class="nav-link" :class="{ 'text-primary': $route.path === '/' }" to="/"
            @click="navigate; isOpen = false">Home</router-link>
        </li>
        <!--
        Request page route.
        -->
        <li class="nav-item">
          <router-link v-slot="{ navigate }" class="nav-link" :class="{ 'text-primary': $route.path === '/request' }"
            to="/request" @click="navigate; isOpen = false">Request</router-link>
        </li>
        <!--
        Manager page route.
        -->
        <li class="nav-item">
          <router-link v-slot="{ navigate }" class="nav-link" :class="{ 'text-primary': $route.path === '/manager' }"
            to="/manager" @click="navigate; isOpen = false">Manager</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'NavbarComponent',
  setup() {
    /**
     * A reactive reference that controls the visibility of the navigation bar.
     * It is initially set to `false`, meaning the navigation bar is not visible.
     * @type {Ref<Boolean>}
     */
    const isOpen = ref(false);
    return { isOpen };
  }
}
</script>