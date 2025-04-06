

import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router/router.js'
import store from './store.js'; 

const app = createApp(App);

app.use(router);
app.use(store);
store.dispatch("loadActualizarComunicador");

app.mount('#app');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log("Service Worker registrado con éxito"))
      .catch(error => console.log("Error al registrar el Service Worker:", error));
  }
  
