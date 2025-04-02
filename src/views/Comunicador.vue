<template>


  <div class="grid" >
  
    <!-- Botones con funcionalidad de voz -->
    <button
      v-for="(item, index) in buttons"
      :key="index"
      class="btn"
      :data-text="item.text"
      :style="{ backgroundImage: `url(${item.image})` }"
      @click="speakText(item.text)"
    ></button>

    <!-- Botones principales de 'NO' y 'SÍ' -->
    <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
    <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
  </div>
  



</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const vozSeleccionada = computed(() => store.state.vozSeleccionada);

const hablar = (texto) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(texto);
  const voz = store.getters.getVocesDisponibles.find(v => v.name === vozSeleccionada.value);

  if (voz) utterance.voice = voz;

  synth.speak(utterance);
};

export default {
  data() {
    return {
      buttons: [
        { text: "quiero comer", image: "/comer.jpg" },
        { text: "Agua", image: "/agua.jpg" },
        { text: "Ir a pasear", image: "/pasear.jpg" },
        { text: "Kinder", image: "/kinder.png" },
        { text: "quiero al baño", image: "/pipi.jpg" },
        { text: "Tren", image: "/tren.jpg" },
      ],
    };
  },
  methods: {
    speakText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES"; // Idioma español
      speechSynthesis.speak(utterance);
    },
  },
};



</script>

<style scoped>
body {
    font-family:Arial, sans-serif ;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
margin: 0;
background-color: #e8ecdc;
}

.grid {
  display: auto ;
  margin-left: -150px ;
  margin-top: -50px ;
}

.btn {
  position: relative;
  width: 150px;
  height: 130px;
  background-size: cover;
  background-color: rgb(29, 105, 143);
  background-position: center;
  border: none;
  cursor: pointer;
  margin: 5px;
  margin-left: 0cap;
}
.btn:hover:after {
        content: attr(data-text);
        position:absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(18, 76, 122, 0.929);
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        white-space: nowrap; /* Evita saltos de línea */
    min-width: 50px; /* Ajusta el ancho mínimo */
    max-width: 200px; /* Para evitar textos muy largos */
    text-align: center;
    }
.button {
  width: 100px;
 
  color: #d4e7ec;
  font-size: 18px;
  margin: 5px;
  cursor: pointer;
  margin-left: 0px;
}


.no {
  background-color: rgb(167, 11, 11);
  color: white;
  margin-left: 30px;
}

.si {
  background-color: rgb(3, 80, 42);
  color: white;
  margin-left: 30px;
  
  
}.container {
  padding: 40px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .container {
    font-size: 14px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .container {
    font-size: 12px;
    padding: 5px;
  }

}
</style>
