<template>
  <div class="comunicador">
    
    <div v-if="fullscreenItem" class="fullscreen-card">
      <img :src="fullscreenItem.image" alt="Imagen seleccionada" />
      <p>{{ fullscreenItem.text }}</p>
       <div class="fullscreen-card-buttons">
      <button class="speak-button" @click="speakText(fullscreenItem.text)">🗣️Hablar</button>
      <button class="back-button" @click="fullscreenItem = null">◀️Volver</button>
    </div>
     <div class="fullscreen-si-no">
    <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
    <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
  </div>
    </div>

    
    <div v-else class="grid">
      <button
        v-for="(item, index) in buttons"
        :key="index"
        class="btn"
        :data-text="item.text"
        :style="{ backgroundImage: `url(${item.image})` }"
        @click="showFullscreen(item)"
      ></button>

      <div class="botones-container">
        <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
        <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      fullscreenItem: null,
      buttons: [
        { text: "quiero comer", image: "/pasta.jpg" },
        { text: "Agua ,tengo sed", image: "/agua.jpg" },
        { text: "vamos  a pasear", image: "/pasear.jpg" },
        { text: "estoy enfermo", image: "/enfermo.jpg" },
        { text: "quiero al baño", image: "/baño.jpg" },
        { text: "quiero ir con el tren", image: "/tren.webp" },
      ],
    };
  },
  methods: {
    showFullscreen(item) {
      this.fullscreenItem = item;
      this.speakText(item.text);
    },
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
  grid-template-columns: repeat(2, 150px);
  margin-top: -50px ;
  padding: -5px;
  row-gap: 10px; 
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
  .fullscreen-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fullscreen-card img {
  max-width: 420px;
  min-height: 630px;
  border-radius: 12px;
  margin-top: -20px;
  margin-left: 50px;
  box-shadow: 6px 6px 10px 6px rgba(66, 210, 230, 0.884);
  margin: 20px px;
}

.fullscreen-card p {
  font-size: 2rem;
  margin-top: -20px;

}

.fullscreen-card-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-left:  -30px;
}

.speak-button,
.back-button {
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.speak-button:hover,
.back-button:hover {
  background: #268ac4;
}

.fullscreen-si-no {
  display:none;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 300px;
  margin-left: -3000px;
}



</style>
