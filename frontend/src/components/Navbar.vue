<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 fixed-top">
    <router-link class="navbar-brand" to="/">ChatSQL</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :class="{ 'text-primary': $route.path === '/' }" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{ 'text-primary': $route.path === '/request' }" to="/request">Request</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{ 'text-primary': $route.path === '/manager' }" to="/manager">Manager</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>