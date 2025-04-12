<template>
  <div id="app">

   <header>
      <button 
        class="menu-toggle"
         @mouseover="openSidebar"
          @mouseleave="closeSidebar"
        @click="toggleNavbar"
        :class="{ 'hovered': isHovered }"
        :aria-expanded="isNavbarOpen.toString()"
        aria-controls="sidebar"
        aria-label="Abrir menú de navegación">
         ≣
      </button>
      
    <button class="btn-comunicador"> <router-link 
              to="/comunicador" 
              aria-label="Ir a la página del comunicador" 
              @click="Comunicador"> Comunicador</router-link></button>

              <button class="btn-mi-comunicador"> <router-link 
              to="/mi-comunicador" 
              aria-label="Ir a la página del mi-comunicador" 
              @click="Mi-Comunicador">MiComunicador</router-link></button>
      
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
import Comunicador from './views/Comunicador.vue';
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("cargarVoces");
})


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
let deferredPrompt;
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


</script>


<style scoped>

body {font-family: Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: -20px;
  height: 100vh;
  background-color: #eaeedd;
  overflow-x: hidden;
   
}

header {
  
  display: flex;
  justify-content:flex-start ;
  margin-top:-10px;
  align-items: center;
  width:100%;
  max-width: 100vw; 
  height: 80px;
  background: linear-gradient(to bottom, #4153b4, #87d3ce);
  margin-left: -10px;
  gap:40px;
  padding: 0  40px;


.menu-toggle {
  
  width: 60px;
  height: 42px;
  padding: 1PX;
  color: #42acc7;
  background:#f6f7f5;
  border: none;
  cursor: pointer;
  margin-right:150px; 
  margin-left: -26px;
  margin-top: 13px;;
  margin-bottom:8px;
  transition: background-color 0.3s, color 0.3s;
  
}

.menu-toggle:hover {
  background-color: #1edbcb; /* Cambia el color de fondo al hacer hover */
  color: #f0ebeb; /* Cambia el color del texto */
}
.router-link-exact-active, 
.router-link-active {
  text-decoration: none !important;
  color: #07BEB8;
}

.btn-comunicador, .btn-mi-comunicador {
  text-decoration: none !important;
  color: #07BEB8;
}
router-link-exact-inactive, 
.router-link-inactive {
  text-decoration: none !important;
  color:#07BEB8;
}

.btn-comunicador, .btn-mi-comunicador {
  text-decoration: none !important;
}

.router-link {
  text-decoration: none !important;
  color:#07BEB8;
}

header .btn-comunicador, header .btn-mi-comunicador {
  text-decoration: none !important;
  color:#07BEB8 !important;
}




.btn-comunicador{ 
 
  text-decoration: none !important; 
  font-family: 'Poppins', sans-serif;
  color: #07BEB8;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(30, 170, 123, 0.3);
  font-size: 20px; 
  background-color: #f6f9fa; 
  padding: 10px 10px; 
  display: inline-block; 
  text-align: center; 
  cursor: pointer; 
  margin-left: -180px;
  margin-top: 20px; 
  margin-bottom: auto;
  box-shadow: 0 2px 4px rgba(60, 206, 186, 0.2);
  transition: background-color 0.3s ease; 
  
}
.router-link {
  text-decoration: none !important;
  color: inherit; /* Mantener el color si se desea */
}
.btn-mi-comunicador{
  text-decoration: none !important;
  color: rgb(38, 142, 226);
  
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  font-size: 20px; 
  background-color: #f1f5f7; 
  padding: 10px 10px; 
  border:#f0eae6; 
  border-radius: 5px; 
  display: inline-block; 
  text-align: center; 
  cursor: pointer; 
  margin-left: -30px;
  margin-top: 20px; 
  margin-bottom: auto;
  box-shadow: 0 2px 4px rgba(89, 192, 183, 0.2); 
  transition: background-color 0.3s ease; 
}


.btn-comunicador:hover {
  background-color: #14969b; 
  color:#eaeedd;
  text-decoration: none;
}


.btn-mi-comunicador:hover {
  background-color: #2ba1a5; 
  text-decoration: none;
}


}

.router-link {
  text-decoration: none !important;
  color: inherit; /* Mantener el color si se desea */
}

.sidebar {
  position: fixed;
  top: 18;
  left: -190px;
  margin-left:-12px ;
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


main {
 margin-left: 10px;
  margin-top: -90px;
  padding: 150px;
  color: transparent;
}

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 150px);
        row-gap: 10px; /* Espacio entre las filas */
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
}

@media (min-width: 769px) {
  .body {
    font-size: 24px;
  }
}

</style>
