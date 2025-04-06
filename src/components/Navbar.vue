<template>
    <nav>
      <router-link to="/comunicador">Comunicador</router-link>
      <router-link to="/actualizar-comunicador">ActualizarComunicador</router-link>
      <router-link to="/galeria">Galería</router-link>
      <router-link to="/contacto">Contacto</router-link>
      <router-link to="/funcionamiento">Funcionamiento</router-link>
      <router-link to="/voz">Configurar Voz</router-link>
     </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style>
  nav {
    display: flex;
    gap: 1rem;
    text-decoration: none;
    color: aqua;
  }
  router-link {
    text-decoration: none;
    color: rgb(114, 207, 200);
  }
  router-link-active {
    font-weight: bold;
    color: rgb(25, 190, 113);
    text-decoration: none;
  }
  </style>
  