<template>
   <h1>MI COMUNICADOR</h1> 
    <div class="mi-comunicador">
      
    
      <div class="grid">
        <div v-for="(button, index) in buttons" :key="index" class="image-card">
          <img :src="button.image" :alt="button.text" />
          <p @click="speakText(button.text)">{{ button.text }}</p>
        </div>
      </div>
  
      <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
      <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
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
  background: linear-gradient(45deg, #4426f0, #61d495);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: xx-large;
  text-align:justify;
  margin-top:-60px ;
  margin-left: -160px;
  padding:60px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  row-gap: 10px;
  column-gap: 40px;
  margin: 20px auto;
  margin-left: -145px;
  margin-bottom: -20px;
  margin-top: -60px;
}

.button{
  width: 150px;
  height: 130px;
  background-size: cover;
  background-color: rgb(29, 105, 143);
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
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(18, 76, 122, 0.929);
        color: #fff;
        padding: 10px 40px;
        border-radius: 5px;
        font-size: 14px;
    }
.image-card {
  position: relative;
  display: inline-block; 
  overflow: hidden;
  background: white;
  width: 130px;
  height: 120px;
  border-radius: 12px;
  box-shadow: 2px 4px 10px rgba(143, 189, 151, 0.884);
  padding: 26px;
  text-align:center;
}
.image-card img {
  display: block;
  margin-left: -15px ;
  margin-top: -15px;
  width: 160px;
  height: 120px;
  border-radius: 5px;
}
.image-card p {
  width: 170px;
  height: 100px;
  background-size: cover;
  background-color: rgb(244, 246, 247);
  background-position: center;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px;
  margin-left:  -20px;
  
}

.image-card p:hover {
  content: attr(data-text);
        position:inherit;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(88, 154, 207, 0.929);
        color: #fff;
        padding: 10px 40px;
        border-radius: 12px;
        font-size: 14px;
  background-color: #31b8bd;
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

  
.no {
  background-color: rgb(167, 11, 11);
  color: white;
  margin-left: -110px;
  margin-top: 40px;
}

.si {
  background-color: rgb(3, 80, 42);
  color: white;
  margin-left: 80px;
  margin-top: -30px;
  
  
}

</style>
  