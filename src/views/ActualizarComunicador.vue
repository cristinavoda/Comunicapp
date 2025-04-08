<template>
  <div class="actualizar-comunicador">
    <h1>Actualizar Comunicador</h1>

    <div class="upload-section">
    
      <label class="custom-file-upload">
        Subir imagen personal
        <input type="file" @change="handleFileUpload" accept="image/*" hidden />
      </label>

     <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="fetchImages"
        placeholder="Buscar imagen"
      />
    

      <button @click="fetchImages" class="search-button">
        <i class="fas fa-search"></i> 
      </button>
    </div>

      <div v-if="loading">Cargando imágenes...</div>
      <div v-if="error">{{ error }}</div>

     
      <div class="images-grid">
        <div v-for="image in images" :key="image.id" class="image-card">
          <img :src="image.previewURL" :alt="image.tags" />
          <button @click="selectPixabayImage(image)">Guardar</button>
        </div>
      </div>

      <div v-if="uploadedImage || selectedPixabayImage || $store.state.selectedImage " class="preview-section">
       
        <img :src="uploadedImage || selectedPixabayImage || $store.state.selectedImage?.image" :alt="'Imagen seleccionada'" />
        <div v-if="$store.state.selectedImage">
     
      <p v-if="$store.state.selectedImage">{{ $store.state.selectedImage.text }}</p>
    </div>
    
  
        <input v-model="selectedImageText" type="text" placeholder="Escribe el texto asociado" />
       
      </div>
    </div>

    <div class="grid">
      <div v-for="(button, index) in buttons" :key="index" class="image-card">
        <img :src="button.image" :alt="button.text" />
        <p @click="speakText(button.text)">{{ button.text }}</p>
        <button class="replace-button" @click="replaceImage(index)">Reemplazar</button>
      </div>
    </div>

    <button v-if="hasChanges" class="save-button" @click="saveChanges">Guardar Cambios</button>
    <div class="botones-container">
    <button id="no-button" class="button no" @click="speakText('NO')">NO</button>
    <button id="si-button" class="button si" @click="speakText('SÍ')">SÍ</button>
  </div>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      uploadedImage: null,
      hasChanges: false,
      selectedImageText: "",
      selectedPixabayImage: null, 
      images: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["selectedImage","buttons"]),
    ...mapState(["selectedImage","buttons"]),
    selectedImage() {
    return this.$store.state.selectedImageForUpdate;
  },
  ...mapState(["vozSeleccionada"])
  },

  methods: {
    ...mapActions(["addSavedImage", "removeSavedImage","addSelectedImage","addToActualizarComunicador", "addToGaleria","cargarVoz"]),
    
    hablar(texto) {
      let utterance = new SpeechSynthesisUtterance(texto);
      utterance.voice = speechSynthesis.getVoices().find(v => v.name === this.vozSeleccionada);
      speechSynthesis.speak(utterance);
    },
   
    handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImage = e.target.result;
      this.selectedPixabayImage = null; 
    };
    reader.readAsDataURL(file);
  }
},
async fetchImages() { 
  if (!this.searchQuery) return;
  this.loading = true;
  this.error = null;

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=43441518-85d5d394329fe4bdef820c138&q=${encodeURIComponent(this.searchQuery)}&image_type=photo&per_page=6`
    );
    const data = await response.json();

    if (data.hits.length === 0) {
      this.error = "No se encontraron imágenes.";
      this.images = [];  
    } else {
      this.images = data.hits;

     
      const imageToUse = this.selectedImage || data.hits[0].webformatURL;
      const base64Image = await this.imageToBase64(firstImage);
      this.selectedPixabayImage = base64Image;
      this.addToPreviewSection(imageToUse);
      localStorage.setItem("imagenPixabay", base64Image);
    }
  } catch (err) {
    this.error = ".";
    console.error(err);
  } finally {
    this.loading = false;
  }
}
,

   selectPixabayImage(image) {
      this.selectedPixabayImage = image.webformatURL;
      this.images = []; 
    },


   addToPreviewSection(image) {
  this.$store.commit("set_SELECTED_IMAGE_TEXT", image);
  this.$store.commit("UPDATE_SELECTED_IMAGE_TEXT", image.tags);
},

    replaceImage(index) {
  if (this.uploadedImage || this.selectedPixabayImage) {
    const newImage = this.uploadedImage || this.selectedPixabayImage;
    this.$store.dispatch("replaceImage", { index, image: newImage, text: this.selectedImageText });
    this.uploadedImage = null;
    this.selectedPixabayImage = null;
    this.selectedImageText = "";
    this.hasChanges = true;
  }
},
  guardarImagenDesdePixabay(imagen) {
  this.$store.dispatch("saveImage", imagen);
},


speakText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES"; 
      speechSynthesis.speak(utterance);
    },

    

mounted() {
  console.log("Estado inicial de buttons:", this.$store.state.buttons);
  const imageData = this.$route.query.image ? JSON.parse(this.$route.query.image) : null;
  if (imageData) {
    this.set_SELECTED_IMAGE(imageData);
};
{
    this.cargarVoz(); 
  }

  },

  },}


</script>



<style scoped>
h1 {
  background: linear-gradient(45deg, #4426f0, #61d495);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: x-large;
  text-align:start;
  margin-top:-30px ;
  margin-left:0%;
  margin-right: auto;
  display: block; 
  padding: 10px; 
}

.upload-section {
  margin: 0px 10px;
  margin-left: -160px;
  padding: 30px;
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  color: white;
  border-radius: 5px;
  width: 440px;
  text-align: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 2px 4px 10px rgba(143, 189, 151, 0.884);
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 220px;
  margin-left: -18px;
}

.custom-file-upload {
  display: inline-block;
  padding: 10px;
  background-color: #268ac4;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}



.search-container {
  
  background-color: #3bb7dd;
  display: flex; 
  width: 470px;
  margin-left: -20px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  gap: 15px;
  overflow: hidden; 
 
 }
 

.search-container-input{
  flex: 1;
  height: 35px;
  border: 2px solid #240bb4;
  border-radius: 5px;
  background-color: #c2cbe4;
  padding: 5px;
  outline: none;
  color: rgb(12, 8, 59);
  margin-right: 5px;
  margin-left: -25px;
}
.search-button {
  background-color: #323ddb;
  border: 1px solid #350d68;
  height: 20px;
  width: 10px;
  cursor: pointer;
  padding: 0 5px;
  border-radius: 5px;
  display: flex; 
  align-items: center;
  justify-content: center;
  margin-left:-9px; }
  
.search-button i {
  font-size: 18px; 
  color: #2b0c72;
}

.preview-section {
  display: inline;
}

.preview-section img {
  max-width: 470px;
  border-radius: 5px;
  margin-left:-15px;
}

.input-button{
  height: 40px;
  width:200px;
  border: 2px solid #0d7575;
  border-radius: 5px;
  background-color: #c2cbe4;
  outline: none;
  color: rgb(12, 8, 59);
  flex-grow: 1; 
  margin-right: 10px; 
  margin-left:-9px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  row-gap: 10px;
  column-gap: 100px;
  margin: 20px auto;
  margin-left: -150px;
}

.save-button {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(40, 177, 201, 0.7);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  opacity: 0;
  visibility: hidden; 
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  
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
  box-shadow: 2px 4px 10px rgba(115, 228, 194, 0.884);
  padding: 26px;
  text-align: center;
}

.image-card img {
  display: block;
  margin-left: -20px ;
  margin-top:-20px;
  width: 220px;
  height: 220px;
  border-radius: 5px;
  text-align: center;
}

.image-text-button:hover {
  background-color:  #ffffff;
  color:#0d7575;
}

.image-card p {
  width: 170px;
  height: 180px;
  background-size: cover;
  background-color: #ffffff; 
  color: #026e8f;
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
        background-color: #ffffff; 
        color: #26ecd2;
        padding: 10px 40px;
        border-radius: 12px;
        font-size: 23px;
  
}



.replace-button {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(40, 177, 201, 0.7); 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  opacity: 0; 
  visibility: hidden; 
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  
} 
.image-card:hover .replace-button {
  opacity: 1;
  visibility: visible;
}

.save-button {
  display: block;
  background-color: #3cb7e7;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  text-align: center;
  margin: 20px auto;
  width: 200px;}
  .botones-container {
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap: 10px;
    margin-left: -150pxnpm run dev
    ;
}

.botones-container {
    display: flex;
    justify-content:flex-start ; 
    align-items:flex-start; 
    gap: 10px;
    margin-left: -150px;
}

  
.no {
  background-color: rgb(167, 11, 11);
  color: white;
}

.si {
  background-color: rgb(3, 80, 42);
  color: white;
  margin-left: 40px;
  
}
</style>
