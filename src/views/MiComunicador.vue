
<template>
  <div class="mi-comunicador">
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedButton: null,
    };
  },
  computed: {
    ...mapState(["buttons"]),
  },
  methods: {
    speakText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    },
    selectButton(button) {
      this.selectedButton = button;
      this.speakText(button.text);
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

  
  <style scoped>

  h1 {
  display:flex;
  background: linear-gradient(45deg, #2f11db, #09c75e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
   color: white ;
  font-size: xx-large;
  text-align:justify;
  margin-top:-90px ;
  margin-left: -170px;
  padding:60px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  row-gap:0px;
  column-gap: 80px;
  margin: 20px auto;
  margin-left: -155px;
  margin-bottom: -20px;
  margin-top: -60px;
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
  box-shadow: 6px 6px 4px rgba(66, 191, 207, 0.726);
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
        color: #2f9bc5; font-family: 'Poppins', sans-serif;
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
  height: 50px;
  color: #298096;
  
  font-size: 18px;
  margin: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.botones-container {
    display:flex;
    justify-content:flex-start; 
    align-items:flex-start; 
    gap: 10px;
    margin-left: -150px;
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
 .fullscreen-si-no {
  display:none;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 30px;
  margin-left: -30px;
}


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
  top: 83px; 
  left: 0px;
  right: 0;
  bottom: 10px;
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
  box-shadow: 0 4px 15px rgba(39, 195, 223, 0.87);
}

.fullscreen-card p {
  font-size: 2rem;
  margin-top: 20px;
  background: linear-gradient(45deg, #2a045c, #43ddd5);
    -webkit-background-clip: text;
  

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
  