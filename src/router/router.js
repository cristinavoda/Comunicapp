import { createRouter, createWebHistory } from 'vue-router';
import MiComunicador from '@/views/MiComunicador.vue';
import Galeria from '@/views/Galeria.vue';
import Contacto from '@/views/Contacto.vue'; 
import Funcionamiento from '@/views/Funcionamiento.vue';
import ActualizarComunicador from "@/views/ActualizarComunicador.vue";
import Comunicador from "@/views/Comunicador.vue";
import Voz from "@/views/Voz.vue";

const routes = [
  { path: '/', redirect: '/mi-comunicador' },
  { path: '/mi-comunicador', component: MiComunicador },
  { path: '/galeria', component: Galeria },
  { path: '/contacto', component: Contacto },
  { path: '/funcionamiento', component: Funcionamiento },
  {path: "/actualizar-comunicador",
    name: "ActualizarComunicador",
    component: ActualizarComunicador,
  },
  { path: "/comunicador", component: Comunicador },
  { path: "/voz", component: Voz },

 
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
