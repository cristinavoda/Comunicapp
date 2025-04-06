<template>

<div class="grid" >
  
   <button
      v-for="(item, index) in buttons"
      :key="index"
      class="btn"
      :data-text="item.text"
      :style="{ backgroundImage: `url(${item.image})` }"
      @click="speakText(item.text)"
    ></button>

    
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
        { text: "quiero comer", image: "/pasta.jpg" },
        { text: "Agua ,tengo sed", image: "/agua.jpg" },
        { text: "vamos  a pasear", image: "/pasear.jpg" },
        { text: "estoy enfermo  ", image: "/enfermo.jpg" },
        { text: "quiero al baño", image: "/baño.jpg" },
        { text: "quiero ir con el tren", image: "/tren.webp" },
      ],
    };
  },
  methods: {
    speakText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
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
  display: grid ;
  margin-left: -150px ;
  margin-top: -50px ;
  padding: -5px;
  row-gap: 15px; 
  column-gap: 10px; 
  margin-left: -160px;
 
  ;
}

.btn {
  position: relative;
  display: inline-block;
  width: 210px;
  height: 210px;
  background-size: cover;
  background-color: rgb(29, 105, 143);
  background-position: center;
  border-radius: 12px;
  box-shadow: 4px 4px 4px rgba(203, 162, 250, 0.884);
  cursor: pointer;
  overflow: hidden;
  margin: 12px;
  margin-bottom: 12px;
  padding: 0px;
  margin-left: 0cap;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.btn:hover:after {
  content: attr(data-text);
        position:absolute;
        bottom: 1px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ffffff;
        color: #42acc7; font-family: 'Poppins', sans-serif;
        font-weight: 600;
        padding: 10px 10px;
        border-radius: 5px;
        font-size: 20px;
        white-space: nowrap;
    min-width: 50px; 
    max-width: 200px; 
    text-align: center;
    height: 10px;
    }
.button {
  width: 100px;
  height: 40px;
  background-color: aqua;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #d4e7ec;
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
  padding: 60px;
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
