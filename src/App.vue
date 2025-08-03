<template>
  <div id="app">
<header>
  <button
    class="menu-toggle"
    @mouseover="openSidebar"
    @mouseleave="closeSidebar"
    @click="toggleNavbar"
    :aria-expanded="isNavbarOpen.toString()"
    aria-controls="sidebar"
    aria-label="Abrir menú de navegación">
    ≣
  </button>

  <router-link to="/comunicador" class="btn-comunicador">
    Comunicador
  </router-link>

  <router-link to="/mi-comunicador" class="btn-mi-comunicador">
    MiComunicador
  </router-link>
  
  
</header>

  
   
    <aside 
      id="sidebar"
      :class="{ open: isNavbarOpen }"
      class="sidebar"
      role="navigation"
      aria-label="Menú de navegación principal">
      <nav>
        <ul><li>
            <router-link 
              to="/mi-comunicador" 
              aria-label="Ir a la página del Micomunicador" 
              @click="closeNavbar">MiComunicador</router-link>
          </li> 
          <li>
            <router-link 
              to="/comunicador" 
              aria-label="Ir a la página del comunicador" 
              @click="closeNavbar">Comunicador</router-link>
          </li> 
          <li><router-link
              to="/actualizar-comunicador"
              aria-label="Ir a la seccion de actualizar-comunicador"
              @click="closeNavbar">Actualizar-Comunicador</router-link>
          </li>

          <li>
            <router-link 
              to="/galeria" 
              aria-label="Ir a la galería" 
              @click="closeNavbar">Galería</router-link>
          </li>

          <li>
            <router-link 
              to="/contacto" 
              aria-label="Ir a la sección de contacto" 
              @click="closeNavbar">Contacto</router-link>
          </li>

          <li>
            <router-link 
              to="/funcionamiento" 
              aria-label="Ir a la sección de funcionamiento" 
              @click="closeNavbar">Funcionamiento</router-link></li>

              <li><router-link to="/voz">🗣 Configurar Voz</router-link>
       </li>
             
   
       <li><button v-if="showInstallButton" @click="instalarApp" class="install-button">
      📲 Instalar App
    </button></li>
             
        </ul>
      </nav>
    </aside>

    
    <main>
      <MiComunicador v-if="showMiComunicador" />
      <router-view />
     
    </main>

  </div>
</template>



<script setup>

import { ref } from 'vue'
import Comunicador from './views/Comunicador.vue'

import { onMounted } from "vue";
import { useStore } from "vuex";
const deferredPrompt = ref(null)
const showInstallButton = ref(false)
const store = useStore();

onMounted(() => {
  store.dispatch("cargarVoces")

   if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('✅ Service Worker registrado:', registration)
    }).catch((error) => {
      console.log('❌ Error al registrar el Service Worker:', error)
    })
  }

  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallButton.value = true
    console.log('📲 Evento de instalación capturado')
  })
})


function instalarApp() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ App instalada por el usuario')
      } else {
        console.log('❌ Usuario rechazó la instalación')
      }
      deferredPrompt.value = null
      showInstallButton.value = false
    })
  }
}





const isNavbarOpen = ref(false)
const isHovered = ref(false)

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value
  if (isNavbarOpen.value) {
    setTimeout(() => {
      isNavbarOpen.value = false;
    }, 7000);
  }
}
function openSidebar() {
  isHovered.value = true
}
function closeNavbar() {
  isNavbarOpen.value = false
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    console.log('Service Worker registrado con éxito:', registration);
  }).catch((error) => {
    console.log('Error al registrar el Service Worker:', error);
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  
  e.preventDefault();
  
  deferredPrompt = e;
  
  document.getElementById('installButton').style.display = 'block';

  
  document.getElementById('installButton').addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó la instalación');
      } else {
        console.log('El usuario rechazó la instalación');
      }
      deferredPrompt = null;
    });
  });
})


onMounted(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event
  })
})


</script>


<style scoped>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}

body {font-family: Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: -25px;
  height: 100vh;
  background-color: #e5f0e9;
  overflow-x: hidden;
   
}
header {
  display: flex;
  align-items:flex-start; 
  justify-content: flex-start;
  height: 80px;
  background: linear-gradient(to bottom, #4153b4, #87d3ce);
  padding: 0 10px;     
  box-sizing: border-box; 
  gap: 8px;
  margin: 0 auto;
  width: 130%;
  margin-left: -10px;

  
}


header button, 
.btn-comunicador, 
.btn-mi-comunicador {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  height: 40px;
  margin-top: 16px;
  background-color: #f6f9fa;
  color: #07BEB8;
  padding: 10px 20px;         
  border: none;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(30, 170, 123, 0.3);
  box-shadow:4px 4px 4px rgba(11, 125, 145, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
  border-radius: 8px;
}

header button:hover,
.btn-comunicador:hover,
.btn-mi-comunicador:hover {
  background-color: #3ecad1;
  color: #eaeedd;
  text-decoration: none;
  box-shadow: #3f0db4;
  border-radius: 8px;
}

.menu-toggle {
  font-size: 20px; 
  width: 80px;
  height: 40px;
  margin-top: 16px;
  margin-left: -1px;
}


.router-link {
  color: #07BEB8;
  text-decoration: none !important;
  color: inherit;
  border-radius: 8px;
}




.sidebar {
  position: fixed;
  top: 18;
  left: -190px;
  margin-left: 7px;
  z-index: 1000;  
  width: 170px;
  height: 100%;
  background: linear-gradient(to bottom, #87d3ce, #152eb9);
  background-color: rgb(10,167, 149) ;
  color: white;
  overflow-y:auto;
  transition: opacity 0,5s visibility 0,5s;
  padding-top: 20px;
}

.sidebar.open {
  left: 0;
  
}
.sidebar.hidden {
  opacity: 0;
  visibility: hidden;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  
  margin: 0;
}

.sidebar li {
  margin: 0;
  padding: 20px 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  
}

.sidebar a:hover {
  background-color: #07BEB8;
}
.install-button {
  background-color:  #004f4f;
  
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
}
.install-button:hover {
  background-color: #004f4f;
}

main {
 margin-left: 10px;
  margin-top: -90px;
  padding: 150px;
  color: transparent;
}

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 150px);
        row-gap: 10px; 
  column-gap: 70px;
       
    }
    
    .btn {
        width: 190px;
        height: 210px;
        background-color: #25b3b8;
        background-size: cover;
        background-position: center;
        border: none;
        position: relative;
        cursor: pointer;
    }
    
    .btn:hover::after {
        content: attr(data-text);
        position: absolute;
        bottom: 10px;
        background-color: rgba(28, 132, 180, 0.929);
        color: #ffffff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
    }
    
    


.no{
    background-color: #ee0a0a;
    height: 50px;
}
.si{
    background-color: #04706ee1;
    height:50px ;
}

@media (max-width:768px) {
  .body {
    font-size: 20px;;
  }
  .header {
    background-size: cover;
    background-position: center;}
}

@media (min-width: 769px) {
  .body {
    font-size: 24px;
  }
}

</style>