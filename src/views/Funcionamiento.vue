<template>
  <div class="about">
    <h1>Personalizar tu Comunicador</h1>
    

    <hr class="step-divider">

    <h2>ACTUALIZAR-COMUNICADOR - Personaliza el Comunicador con imágenes y palabras adaptadas.</h2>

    <hr class="step-divider">
      <h3>Opción 1: Subir una imagen personal</h3>
      
      
        <p>Selecciona una imagen desde su dispositivo.</p>
        <p>Escribe un texto asociado a la imagen (puede ser una frase corta o lo que se necesite).</p>
        <p>Elige la imagen que desea reemplazar en la aplicación.</p>
        <p>Pulsa el botón "Reemplazar" para actualizar la imagen en la aplicación.</p>
      
   

    

  
      <h4>Opción 2: Buscar una imagen en Internet (Pixabay)</h4>
      
      
        <p>Escribe una palabra descriptiva para buscar una imagen (por ejemplo, "gato", "niño", "paisaje").</p>
        <p>Al pulsar el botón azul(buscar), se mostrarán 6 imágenes relacionadas con la búsqueda.</p>
        <p>Selecciona la imagen que desea utilizar.</p>
        <p>Pulsa el botón "Guardar" para agregar la imagen seleccionada.</p>
        <p>Escribe el texto que corresponde a la imagen según las necesidades del usuario.</p>
      
    

    <hr class="step-divider">
    <h5>COMUNICADOR - es un DEMO, con imágenes y voz al hacer click sobre las palabras.</h5>
<hr class="step-divider">

    <h4>MI-COMUNICADOR -  es el Comunicador del usuario, con sus imágenes propias según sus necesidades, y voz al hacer click sobre las palabras.</h4>
<hr class="step-divider">
    <h5>CONTACTO -  Para dudas o ayuda, sugerencias , mandar un mensaje al autor de la aplicación.<br><a href="mailto:cristinavoda483@gmail.com">cristinavoda483@gmail.com</a></br>
</h5>
  
   <hr class="step-divider">
  </div>
</template>

<style scoped>
.about {
  font-family: 'Poppins', sans-serif;
  margin: 20px auto;
  max-width: 90%; 
  width: 100%;
  padding: 20px;
}

h1 {
  font-size: xx-large;
  font-weight: bold;
  background: linear-gradient(45deg, #0535d3, #43ddd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block; 
  text-align: center; 
  margin: 0 0 20px 0;
}

p {
  background: linear-gradient(45deg, #1916d4, #43ddd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  font-size: medium;
  font-weight: 800;
  line-height: 1.6;
  text-align: left; 
    white-space: normal !important;        
  word-break: break-word;                 
  overflow-wrap: break-word;              
  hyphens: auto;                         
  letter-spacing: normal !important;
}

h2, h3, h4, h5 {
  background: linear-gradient(45deg, #049bf3, #1c3be9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  padding: 10px 0;
  margin: 0;
  text-align: left;
}

h2, h3, h4, h5 {
  font-size: medium;
  font-weight: bold;
}

.step {
  margin-bottom: 20px;
}

.step-divider {
  border: none;
  height: 2px;
  background-color: #ccc;
  margin: 30px 0;
}

@media (max-width: 600px) {
  .about {
    padding: 15px;
  }

  h1 {
    font-size: x-large;
  }

  p {
    font-size: 1rem;
  }
}
</style>
