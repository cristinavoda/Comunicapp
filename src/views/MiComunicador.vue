<template>

    <div class="mi-comunicador">
      
    
      <div class="grid">
        <div v-for="(button, index) in buttons" :key="index" class="image-card">
          <img :src="button.image" :alt="button.text" />
          <p @click="speakText(button.text)">{{ button.text }}</p>
        </div>
      </div>
  
      <div class="botones-container">
      <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
      <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
    </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    computed: {
      ...mapState(["buttons"]),
    },
    methods: {
      speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
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
  row-gap: 10px;
  column-gap: 100px;
  margin: 20px auto;
  margin-left: -165px;
  margin-bottom: -20px;
  margin-top: -60px;
}

.button{
  width: 190px;
  height: 210px;
  background-size: cover;
  background-color: rgb(63, 148, 190);
  background-position:center;
  border: none;
  cursor: pointer;
  margin: 5px;
  margin-left: -auto;
}
.button:hover:after {
        content: attr(data-text);
        position:inherit;
        bottom: 10px;
      width: 100px;
        transform: translateX(-50%);
        background-color: rgba(44, 161, 116, 0.929);
        color: #fff;
        padding: 10px 40px;
        border-radius: 5px;
        font-size: 24px;
    }
.image-card {
  position: relative;
  display: inline-block; 
  overflow: hidden;
  align-items: center;
  background: white;
  width: 180px;
  height: 230px;
  border-radius: 12px;
  box-shadow: 2px 4px 10px rgba(143, 189, 151, 0.884);
  padding: 26px;
  text-align:center;
}
.image-card img {
  display: block;
  margin-left: -20px ;
  margin-top: -15px;
  width: 220px;
  height: 220px;
  border-radius: 12px;
}
.image-card p {
  width: 170px;
  height: 180px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #07BEB8;
  background-size: cover;
  background-color: rgb(251, 255, 253);
  background-position: center;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px;
  
  
}

.image-card p:hover {
  content: attr(data-text);
      position:relative;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: #1479a1;
        padding: 10px 40px;
        border-radius: 12px;
        font-size: 20px;
  background-color: #f4f6f7;
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
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap: 10px;
    margin-left: -150px;
}

  
.no {
  
  background-color: rgb(167, 11, 11);
  color: white;
   
  margin-top: 40px;
}

.si {
  background-color: rgb(3, 80, 42);
  color: white;
 
  margin-top: 40px;
}
  
  
  
  


</style>
  
