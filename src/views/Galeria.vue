<template>
  <div class="gallery">
    <h1>GALERÍA</h1>

    <div class="search-container">
      <label class="custom-file-upload">
        Subir imagen personal
        <input type="file" @change="handleFileUpload" accept="image/*" hidden />
      </label>
<input
  class="input-search"
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

    <div class="categories">
      <h2>Categorías</h2>
      <button v-for="cat in categories" :key="cat" @click="selectCategory(cat)">
        {{ cat }}
      </button>
    </div>

    <div class="images-grid">
      <div v-for="image in images" :key="image.id" class="image-card">
        <img :src="image.previewURL" :alt="image.tags" />
        <button class="save-button" @click="addToGallery(image)">
      Guardar
    </button>
      </div>
    </div>

    <h2>Mi Galería</h2>

    <div class="saved-images">
      <div v-for="image in savedImages" :key="image.id" class="image-card">
        <img :src="image.previewURL" :alt="image.tags" @click="selectAndGo(image)"/>
        <button class="delete-button" @click="removeFromSaved(image.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      images: [],
      categories: ["Comida", "Familia", "Hogar", "Salud", "Actividades", "Emociones"],
      loading: false,
      error: null,
      uploadedImage: null,
    };
  },

  computed: {
    ...mapState(["savedImages"]),
  },

  methods: {
    ...mapActions(["saveImage", "removeSavedImage", "loadSavedImages","selectImage"]),

selectAndGo(image) {
  this.$store.commit('set_SELECTED_IMAGE', {
    previewURL: image.previewURL || image.image,
    text: image.text || ""
  });
  this.$router.push({ name: "ActualizarComunicador" });
},

handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = {
        id: Date.now(),
        previewURL: e.target.result,
        tags: "Imagen personal",
      };
      this.$store.dispatch("addSavedImage", image);
      
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
          `https://pixabay.com/api/?key=43441518-85d5d394329fe4bdef820c138&q=${encodeURIComponent(
            this.searchQuery
          )}&image_type=photo`
        );
        const data = await response.json();
        this.images = data.hits;
      } catch (err) {
        this.error = "Hubo un error al cargar las imágenes.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

 addToGallery(image) {
  this.$store.dispatch("addSavedImage", image);
},


    removeFromSaved(id) {
      this.removeSavedImage(id);
    },

    selectCategory(category) {
      this.searchQuery = category;
      this.fetchImages();
    },
  },

  mounted() {
    this.loadSavedImages();
  },
};
</script>


  
  
  <style scoped >
  
  h1 { font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(45deg, #2a045c, #43ddd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin-left: -150px;
    margin-top: -20px;
  }
  
  .gallery {
    padding: 0px;
  }
  .upload-section {
    margin: 0px 10px;
    margin-left: -160px;
    padding: 30px;
    background: linear-gradient(to bottom, #3903b6, #85e6d1);
    color: rgb(248, 250, 250);
    border-radius: 5px;
    width: 300px;
    text-align: center;
    align-items: center;
    border-radius: 12px;
    box-shadow: 2px 4px 10px rgba(143, 189, 151, 0.884);
  }
 
  
  .search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
  max-width: 400px;
  margin-left: -160px; 
}

.custom-file-upload {
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
}

.custom-file-upload:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.input-search {
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  border: none;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  outline: none;
  width: 80%;
  margin-left: 1px;
}

.input-search::placeholder {
  color: #fff;
}

.search-button {
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  border: none;
  border-radius: 15px;
  padding: 15px;
  color: #148e9e;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 8px;
  height: 30px;
  
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

  
   .categories {
  margin-top: -40px;
  margin-left: -170px; 
  max-width: 400px; 
  padding: 10px;
}

.categories h2 {
  
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(45deg, #2a045c, #43ddd5);
  -webkit-background-clip: text;  
  -webkit-text-fill-color: transparent; 
  display: inline-block;
  margin-left: 20px;
  margin-top: 35px;
}


.categories button {
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  display: flex;
  align-items: left;
  justify-content: center;
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 15px;
  gap: 5px;
  overflow: hidden;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 10px; 
  transition: transform 0.2s, box-shadow 0.2s;
}

.categories button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

  .preview-section {
    display: inline;
  }
  
  .preview-section img {
    max-width: 300px;
    border-radius: 5px;
  }
  
.images-grid {
  display: grid;
  grid-template-columns: repeat(2, 150px); 
  gap: 50px;
  margin-left: -150px;
  border-radius: 15px;
  row-gap: 10px;
}

.image-card {
  position: relative;  
  border-radius: 10px;
  overflow: hidden;
  background: #faf8f8;
  box-shadow: 0 2px 10px rgba(91, 122, 136, 0.1);
  border-radius: 15px;
}

.image-card img {
  width: 100%;
  display: block;
}
.save-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to bottom, #3903b6, #85e6d1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.image-card:hover .save-button {
  opacity: 1;
}

 

 h2 {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(45deg, #2a045c, #43ddd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  display: inline-block;
  margin-left: -150px;
  margin-top: 75px;
}

  .saved-images {
    display: grid;
    grid-template-columns: repeat(2, 150px);
    margin-top: 20px;
    margin-left: -170px;
    gap: 50px;
    row-gap: 10px;
  }
  .image-card {
    position: relative; 
    background: white;
    border-radius: 12px;
    box-shadow: 8px 4px 10px rgba(129, 195, 221, 0.884); 
    transition: all 0.3s ease-in-out;
    width: 170px;
    height: 200px;
    border: 1px solid #cce6ec;
    padding: 10px;
    text-align: center;
  }
  .image-card:hover .select-btn {opacity: 1}
  
  .image-card img {
    width: 150px;
    height:170px;
    border: 1px solid #eef0f1;
    border-radius: 5px;
    margin-top: 15px;
  }
  
  
  .delete-button {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
  }
  
  .image-card:hover .delete-button {
    display: block;
  }
  
  
  
  
        
      .btn:hover::after {
          content: attr(data-text);
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(37, 2, 145, 0.929);
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
      }
      
      
  </style>
  