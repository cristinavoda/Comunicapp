<template>
  <div class="comunicador">
    <div class="grid">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="btn"
        :data-text="button.text"
        :style="{ backgroundImage: `url(${button.image})` }"
        @click="speakText(button.text)"
        @dblclick="openFullscreen(button)"
      ></button>
    </div>

    <div class="botones-container">
      <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
      <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
    </div>

    <transition name="fade">
      <div v-if="selectedButton" class="fullscreen-card">
        <img :src="selectedButton.image" :alt="selectedButton.text" />
        <p>{{ selectedButton.text }}</p>
        <div class="fullscreen-card-buttons">
          <button class="speak-button" @click="speakText(selectedButton.text)">🗣️ Hablar</button>
          <button class="back-button" @click="closeFullscreen">◀️ Volver</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttons: [
        { text: "Quiero comer", image: "/pasta.jpg" },
        { text: "Agua, tengo sed", image: "/agua.jpg" },
        { text: "Vamos a pasear", image: "/pasear.jpg" },
        { text: "Estoy enfermo", image: "/enfermo.jpg" },
        { text: "Quiero al baño", image: "/baño.jpg" },
        { text: "Quiero ir con el tren", image: "/tren.webp" },
      ],
      selectedButton: null,
    };
  },
  methods: {
    speakText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      speechSynthesis.speak(utterance);
    },
    openFullscreen(button) {
      this.selectedButton = button;
    },
    closeFullscreen() {
      this.selectedButton = null;
    },
  },
};
</script>

<style>

body {
font-family:Arial, sans-serif ;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
margin-top: 60px;
margin-left: -40px;
background-color: #e8ecdc;

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
  margin-top: -90px;

  
}


.grid {
  display: grid ;
  margin-left: -150px ;

  grid-template-columns: repeat(2, 150px);
  margin-bottom: 0px;
  margin-top: -50px;
  padding: -10px 5px;
  row-gap: 20px; 
  column-gap: 80px; 
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
  box-shadow: 4px 4px 4px rgba(72, 178, 228, 0.884);
  cursor: pointer;
  overflow: hidden;
  margin: 12px;
  margin-bottom: 12px;
  padding: 0px;
  margin-left: 0cap;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap:10px;
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
.botones-container {
    display:flex;
    justify-content:flex-start; 
    align-items:flex-start; 
    gap: 10px;
    margin-left: 10px;
}

  
.no {
  
  background-color: rgb(167, 11, 11);
  color: white;
  box-shadow: 4px 4px 4px rgba(233, 30, 40, 0.884);
  margin-top: 40px;
}

.si {
  background-color: rgb(3, 80, 42);
  color: white;
  box-shadow: 4px 4px 4px rgba(72, 178, 228, 0.884);
  margin-top: 40px;
}

.container {
  padding: 60px;
  font-size: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fullscreen-card {
  position: fixed;
  top: 80px; /* deja espacio para header si tienes uno */
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.fullscreen-card img {
  max-width: 90%;
  max-height: 60vh;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.fullscreen-card p {
  font-size: 2rem;
  margin-top: 20px;
  color: #333;
}

.fullscreen-card-buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.speak-button,
.back-button {
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.speak-button:hover,
.back-button:hover {
  background: #268ac4;
}
</style>