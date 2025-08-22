<template>
    <nav>
      <router-link to="/comunicador">Comunicador</router-link>
      <router-link to="/actualizar-comunicador">ActualizarComunicador</router-link>
      <router-link to="/galeria">Galería</router-link>
      <router-link to="/contacto">Contacto</router-link>
      <router-link to="/funcionamiento">Funcionamiento</router-link>
      <router-link to="/voz">Configurar Voz  © 2025 Comunicador -Cristina Voda-Todos los derechos reservados-Safe Creative</router-link>
        © 2025 Comunicador -Cristina Voda-Todos los derechos reservados-Safe Creative
     ><button v-if="showInstallButton" @click="instalarApp" class="install-button">
      📲 Instalar App
    </button><p v-if="!deferredPrompt" class="mensaje-info">
    
</p>   
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
    color: rgb(21, 138, 128);
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
  .btn-instalar-app {
  margin-left: -5px;
  padding: 0.5rem 1rem;
  display: inline-block; 
  background: transparent;
  color: rgb(241, 247, 246);
  margin-top: -80px; 
  margin-left: -15px;

  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  border: none;
 
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-instalar-app:hover {
 color: #eaeedd;
 background-color: #07BEB8;
}

  </style>
  