<!-- components/Navbar.vue -->
<template>
  <nav class="navbar">
    <img src="@/assets/Logo_gepoa.jpeg" alt="Geoportal logo" class="app-header__logo" />
    <div class="navbar_separator">
      <ul class="nav-links">
      <li><router-link to="/nosotros">Acerca de</router-link></li>
      <li><router-link to="/contact">Como usar el Geoportal</router-link></li>
    </ul>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'GeoportalNavbar',
};
</script>
