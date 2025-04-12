<template>
  <div class="voz-config">
    <h2>Configuración de Voz</h2>

    <label for="voiceSelect">Selecciona una voz:</label>
    <select id="voiceSelect" v-model="selectedVoice">
      <option v-for="voice in voices" :key="voice.name" :value="voice.name">
        {{ voice.name }} ({{ voice.lang }})
      </option>
    </select>

    <button @click="speak">🔊 Probar Voz</button>
    <button @click="guardarVoz">💾 Guardar Voz</button>

    <h3>Voz seleccionada: <strong>{{ selectedVoice }}</strong></h3>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const vozSeleccionada = computed(() => store.state.vozSeleccionada);
const vocesDisponibles = computed(() => store.getters.getVocesDisponibles);

const guardarVoz = () => {
  store.dispatch("cambiarVoz", vozSeleccionada.value);
};
export default {
  data() {
    return {
      voices: [],
      selectedVoice: null
    };
  },
  computed: {
    vozSeleccionada: {
        get() {
            return this.$store.getters.getVoz;
        },
        set(value) {
            this.$store.dispatch("guardarVoz", value);
        }
    }
},


  methods: {
    cargarVoces() {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0 && !this.selectedVoice) {
        this.selectedVoice = this.voices[0].name; // Selecciona la primera voz por defecto
      }
    },
    speak() {
      if (!this.selectedVoice) {
        alert("Por favor, selecciona una voz.");
        return;
      }
      const utterance = new SpeechSynthesisUtterance("Hola, esta es una prueba de voz.");
      utterance.voice = this.voices.find(voice => voice.name === this.selectedVoice);
      window.speechSynthesis.speak(utterance);
    },
    guardarVoz() {
      localStorage.setItem("vozSeleccionada", this.selectedVoice);
      alert("Voz guardada correctamente.");
    }
  },
  mounted() {
    this.cargarVoces();
    window.speechSynthesis.onvoiceschanged = this.cargarVoces;

    // Restaurar voz guardada en localStorage
    const vozGuardada = localStorage.getItem("vozSeleccionada");
    if (vozGuardada) {
      this.selectedVoice = vozGuardada;
    }
  }
};
</script>

<style scoped>

.voz-config {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: -150px;
}
 
h2 { font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(45deg, #1e1bce, #a1ebe7); 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin-left: 0px;
    margin-top: -20px;
  }
  h3 {
    margin-left: 0px;

  }

</style>
