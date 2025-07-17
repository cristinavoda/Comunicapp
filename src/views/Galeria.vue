<template>
  <div class="gallery">
    <h1>GALERÍA</h1>

    <div class="search-container">
      <label class="custom-file-upload">
        Subir imagen personal
        <input type="file" @change="handleFileUpload" accept="image/*" hidden />
      </label>

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

    <div class="categories">
      <h2>Categorías</h2>
      <button v-for="cat in categories" :key="cat" @click="selectCategory(cat)">
        {{ cat }}
      </button>
    </div>

    <div class="images-grid">
      <div v-for="image in images" :key="image.id" class="image-card">
        <img :src="image.previewURL" :alt="image.tags" />
        <button @click="addToGallery(image)">Guardar</button>
      </div>
    </div>

    <h2>Mi Galería</h2>

    <div class="saved-images">
      <div v-for="image in savedImages" :key="image.id" class="image-card">
        <img :src="image.previewURL" :alt="image.tags" />
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
    ...mapActions(["saveImage", "removeSavedImage", "loadSavedImages"]),

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
      this.saveImage(image); 
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
      this.saveImage(image);
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
    color: white;
    border-radius: 5px;
    width: 300px;
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
    width: 110px;
    margin-left: -18px;
  }
  
  
  
  
  .search-container {
    background: linear-gradient(to bottom, #3903b6, #85e6d1);
    display: flex; 
    width: 360px;
    margin-left: -165px;
    border: none;
    border-radius: 15px;
    padding: 25px;
    gap: 35px;
    overflow: hidden; 
   
   }
   .custom-file-upload {
    display: inline-block;
    width: 150px;
    height:50px;
    padding: 10px;
    background-color: #268ac4;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
  
   
  
  .search-input{
    flex: 1;
    height: 70px;
    border: 2px solid #240bb4;
    border-radius: 5px;
    background-color: #c2cbe4;
    padding: 5px;
    outline: none;
    color: rgb(12, 8, 59);
    margin-right: 5px;
    margin-left:auto;
  }
  .search-button {
    background-color: #323ddb;
    border: 1px solid #10b38f;
    height: 20px;
    width: 20px;
    cursor: pointer;
    padding: 0 5px;
    border-radius: 5px;
    display: flex; 
    align-items: center;
    justify-content: center; }
  
  .search-button i {
    font-size: 18px; 
    color: #0f2149;
  }
  
  .preview-section {
    display: inline;
  }
  
  .preview-section img {
    max-width: 300px;
    border-radius: 5px;
  }
  
  .input-button{
    height: 40px;
    width:100px;
    border: 2px solid #0d7575;
    border-radius: 5px;
    background-color: #c2cbe4;
    outline: none;
    color: rgb(12, 8, 59);
    flex-grow: 1; 
    margin-right: 10px; 
  }
  
  
  
  .images-grid {
    display: grid;
    grid-template-columns: repeat(2, 150px);
    margin-top: 20px;
    margin-left: -170px;
    gap: 60px;
    row-gap: 30px;
  }
    
  
  .save-button {
    display: none;
    position:absolute;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #571523;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .categories {
  margin-top: -100px;
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
  margin-left: -150px;
  margin-top: 15px;
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
    background: white;
    border-radius: 12px;
    box-shadow: 2px 4px 10px rgba(143, 189, 151, 0.884); 
    padding: 16px;
    transition: all 0.3s ease-in-out;
    width: 170px;
    height: 200px;
    
    border: 1px solid #cce6ec;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  
    position: relative;
  }
  .image-card:hover .select-btn {opacity: 1}
  
  
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
  
  
  .image-card img {
    width: 150px;
    height:170px;
    
    border: 1px solid #f0eef5;
    border-radius: 5px;
    margin-top: 15px;
  }
  .select-btn {
    
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 128, 128, 0.8); 
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
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
  