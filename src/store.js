import { createStore } from "vuex";
import ActualizarComunicador from "./views/ActualizarComunicador.vue";

const store = createStore({
  state: {
    buttons:  JSON.parse(localStorage.getItem("buttons")) ||[
      { text: "Hoy vamos de viaje con el tren", image: "/TrenAve.png" },
      { text: "a la playa", image: "/Salou.png" },
      { text: "iremos a comer", image: "/Chiringuito.png" },
      { text: "pescado", image: "/Pescado.png" },
      { text: "despues iremos con el barco", image: "/Barco.png" },
      { text: "y a descansar en la habitacion", image: "/HabitacionHotel.png" },
    ],
    selectedImage: JSON.parse(localStorage.getItem("selectedImage")) || null,

    selectedImages: JSON.parse(localStorage.getItem("selectedImages")) || [],
    selectedImageText: localStorage.getItem("selectedImageText") || "",
    actualizarComunicador: [],
    galeria: JSON.parse(localStorage.getItem("galeria")) || [],
    savedImages: JSON.parse(localStorage.getItem("savedImages")) || [],
    vozSeleccionada: localStorage.getItem("vozSeleccionada") || "",
  },

  mutations: {
    set_SELECTED_IMAGE(state, image) {
      state.selectedImage = image;
      localStorage.setItem("selectedImage", JSON.stringify(image));
    },
    ADD_SELECTED_IMAGE(state, image) {
      const exists = state.selectedImages.find((img) => img.id === image.id);
      if (!exists) {
        state.selectedImages.push(image);
        localStorage.setItem(
          "selectedImages",
          JSON.stringify(state.selectedImages)
        );
      }
    },
    ADD_SAVED_IMAGE(state, image) {
      if (!state.savedImages.find((img) => img.id === image.id)) {
        state.savedImages.push(image);
        localStorage.setItem("savedImages", JSON.stringify(state.savedImages));
      }
    },
  
    REMOVE_SELECTED_IMAGE(state, imageId) {
      state.selectedImages = state.selectedImages.filter(
        (img) => img.id !== imageId
      );
      localStorage.setItem("selectedImages", JSON.stringify(state.selectedImages));
      const storedSavedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
      if (storedSavedImages.length > 0) {
        storedSavedImages.forEach((img, idx) => {
          if (idx < state.buttons.length) {
            state.buttons[idx].image = img.previewURL || img;
          }
        });

      }
    },
    REPLACE_IMAGE_TEXT(state, { index, image }) {
      if (index >= 0 && index < state.buttons.length) {  
        state.buttons[index].image = image.previewURL || image;
        localStorage.setItem("buttons", JSON.stringify(state.buttons)); 
      } else {
        console.error("Índice inválido en REPLACE_IMAGE_TEXT:", index);
      }
    }
     ,
    
    UPDATE_SELECTED_IMAGE_TEXT(state, text) {
      state.selectedImageText = text;
      localStorage.setItem("selectedImageText", text);
      console.log("Texto guardado:", text);
    },
    
    set_BUTTONS(state, buttons) {
      state.buttons = buttons;
      localStorage.setItem("buttons", JSON.stringify(buttons)); // Guardar cambios en localStorage
    },
    

    ADD_TO_GALERIA(state, image) {
      if (!state.galeria.find((img) => img.id === image.id)) {
        state.galeria.push(image);
        localStorage.setItem("galeria", JSON.stringify(state.galeria));
      }
    },
    REMOVE_FROM_GALERIA(state, imageId) {
      state.galeria = state.galeria.filter((img) => img.id !== imageId);
      localStorage.setItem("galeria", JSON.stringify(state.galeria));
    },
    ADD_SAVED_IMAGE(state, image) {
      if (!state.savedImages.find((img) => img.id === image.id)) {
        state.savedImages.push(image);
        localStorage.setItem("savedImages", JSON.stringify(state.savedImages));
      }
    },
    REMOVE_SAVED_IMAGE(state, imageId) {
      state.savedImages = state.savedImages.filter((img) => img.id !== imageId);
      localStorage.setItem("savedImages", JSON.stringify(state.savedImages));
    },
    
    UPDATE_ACTUALIZAR_COMUNICADOR(state, newData) {
        state.comunicador = newData;
        localStorage.setItem("ActualizarComunicadorData", JSON.stringify(newData));
      
    },
    SET_ACTUALIZAR_COMUNICADOR(state, datos) {
      state.actualizarComunicador = datos;
    },
    
    
      SET_VOZ(state, voz) {
          state.vozSeleccionada = voz;
          localStorage.setItem("vozSeleccionada", voz); 
      },
      CARGAR_VOZ(state) {
          const vozGuardada = localStorage.getItem("vozSeleccionada");
          if (vozGuardada) {
              state.vozSeleccionada = vozGuardada;
          }
      }
  
  },
  

  actions: {
    addSelectedImageText({ commit }, image) {
      commit("ADD_SELECTED_IMAGE", image);
    },
     selectImage({ commit }, image) {
      commit("SET_SELECTED_IMAGE", image);
    },
    removeSelectedImageText({ commit }, imageId) {
      commit("REMOVE_SELECTED_IMAGE", imageId);
    },
    replaceImage({ commit, state }, { index, image, text }) {
      const updatedButtons = [...state.buttons];
      updatedButtons[index] = { image, text };
      commit("set_BUTTONS", updatedButtons);
    },
    addToGaleria({ commit }, image) {
      commit("ADD_TO_GALERIA", image);
    },
    removeFromGaleria({ commit }, imageId) {
      commit("REMOVE_FROM_GALERIA", imageId);
    },
    addSavedImage({ commit }, image) {
      commit("ADD_SAVED_IMAGE", image);
    },
    removeSavedImage({ commit }, imageId) {
      commit("REMOVE_SAVED_IMAGE", imageId);
    },
     saveImage({ commit, state }, image) {
      const updatedImages = [...state.savedImages, image];
      commit("SET_IMAGES", updatedImages);
      localStorage.setItem("savedImages", JSON.stringify(updatedImages));

    },
    loadSavedImages({ commit }) {
      const saved = JSON.parse(localStorage.getItem('savedImages'));
      if (saved && Array.isArray(saved)) {
        commit('SET_IMAGES', saved);
      }
    },
     
     loadActulizarComunicador({ commit }) {
        const savedData = localStorage.getItem("ActualizarcomunicadorData");
        if (savedData) {
          commit("updateActualizarComunicador", JSON.parse(savedData));
        }
      },
    guardarVoz({ commit }, voz) {
        commit("SET_VOZ", voz);
    },
    cargarVoz({ commit }) {
        commit("CARGAR_VOZ");
    }
    
  },
  getters: {
    buttons: (state) => state.buttons,
    savedImages: (state) => state.savedImages,
    galeria: (state) => state.galeria,
    ActualizarComunicador:(state) => state.Actualizar.ActualizarComunicador,
    selectedImages: (state) => state.selectedImages,
    getVoz: state => state.vozSeleccionada,
  },
});

export default store;