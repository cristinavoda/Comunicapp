<template>
  <div id="app">

   <header>
      <button 
        class="menu-toggle" 
        @click="toggleNavbar"
        :aria-expanded="isNavbarOpen.toString()"
        aria-controls="sidebar"
        aria-label="Abrir menú de navegación">
        ☰
      </button>
      
      <button class="btn-comunicador"> <router-link 
              to="/comunicador" 
              aria-label="Ir a la página del comunicador" 
              @click="Comunicador"> COMUNICADOR</router-link></button>

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
      <router-view></router-view>
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

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value
  if (isNavbarOpen.value) {
    setTimeout(() => {
      isNavbarOpen.value = false;
    }, 7000);
  }
}
function closeNavbar() {
  isNavbarOpen.value = false
}

</script>


<style scoped>

body {font-family: Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  height: 100vh;
  background-color: #eaeedd;
  overflow-x: hidden;
   
}

header {
  
  display: flex;
  justify-content:flex-start ;
  margin-top:-10px;
  align-items: center;
  width:fit-content ;
  height: 80px;
  background: linear-gradient(to bottom, #4153b4, #87d3ce);
  gap:35px;
  padding: 0 40px;


.menu-toggle {
  font-size: 24px;
  width: 60px;
  height: 42px;
  padding: 1PX;
  color: #0f7892;
  background:#eaebe8;
  border: none;
  cursor: pointer;
  margin-right:150px; 
  margin-left: -26px;
  margin-top: 13px;;
  margin-bottom:8px;
  
  
}

.btn-comunicador{
  font-size: 20px; 
  color: rgb(53, 12, 202);
  text-decoration: #04706ee1;
  background-color: #1695b4; 
  padding: 10px 10px; 
  border:#f3f2f2; 
  border-radius: 5px; 
  display: inline-block; 
  text-align: center; 
  cursor: pointer; 
  margin-left: -180px;
  margin-top: 20px; 
  margin-bottom: auto;
  box-shadow: 0 2px 4px rgba(19, 3, 49, 0.2);
  transition: background-color 0.3s ease; 
}
.btn-mi-comunicador{
  font-size: 20px; 
  color: rgb(65, 37, 223);
  text-decoration: none;
  background-color: #1695b4; 
  padding: 10px 10px; 
  border:#f0eae6; 
  border-radius: 5px; 
  display: inline-block; 
  text-align: center; 
  cursor: pointer; 
  margin-left: -30px;
  margin-top: 20px; 
  margin-bottom: auto;
  box-shadow: 0 2px 4px rgba(34, 61, 134, 0.2); 
  transition: background-color 0.3s ease; 
}


.btn-comunicador:hover {
  background-color: #e3e7eb; 
  text-decoration: none;
}


.btn-mi-comunicador:hover {
  background-color: #edf0f3; 
  text-decoration: none;
}


}



.sidebar {
  position: fixed;
  top: 18;
  left: -190px;
  margin-left:8px ;
  z-index: 1000;  
  width: 170px;
  height: 100%;
  background: linear-gradient(to bottom, #87d3ce, #152eb9);
  background-color: rgb(10,167, 149) ;
  color: white;
  overflow-y:auto;
  transition: opacity 0,5s visibility 0,5s;
  padding-top: 80px;
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
}

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 150px);
        grid-gap: 10px;
    }
    
    .btn {
        width: 150px;
        height: 100px;
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
        
        background-color: rgba(180, 28, 36, 0.929);
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
