<!-- Navbar.vue -->
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid d-flex justify-content-center">
        <div class="collapse navbar-collapse d-flex justify-content-center">
          <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-center justify-content-center">
            <li class="nav-item">
              <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
            </li>
            <span class="mx-2">/</span>
            <li class="nav-item">
              <router-link class="nav-link" exact-active-class="active" to="/request">Chat</router-link>
            </li>
            <span class="mx-2">/</span>
            <li class="nav-item">
              <router-link class="nav-link" exact-active-class="active" to="/Manager">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarComponent'
  }
  </script>
  
  <style scoped>
  .nav-link.active {
    text-decoration: underline;
    text-decoration-color: blue;
  }
  </style>