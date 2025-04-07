<template>
  <div class="about">
    <p>Funcionamiento</p>
    <h2>COMUNICADOR es una aplicación para personas no verbales (autismo, ictus, parálisis cerebral, Alzheimer).</h2>


    <h2>COMUNICADOR es un DEMO, con imágenes y voz al hacer click sobre las palabras.</h2>

    <h3>ACTUALIZAR-COMUNICADOR: Personaliza el Comunicador con imágenes y palabras adaptadas.</h3>

    <hr class="step-divider">
      <h4>Opción 1: Subir una imagen personal</h4>
      <hr class="step-divider">

      
        <p>El usuario selecciona una imagen desde su dispositivo.</p>
        <p>Escribe un texto asociado a la imagen (puede ser una frase corta o lo que se necesite).</p>
        <p>El usuario luego elige la imagen que desea reemplazar en la aplicación.</p>
        <p>Pulsa el botón "Reemplazar" para actualizar la imagen en la aplicación.</p>
      
   

    <hr class="step-divider">

  
      <h4>Opción 2: Buscar una imagen en Internet (Pixabay)</h4>
      <hr class="step-divider">
      
        <p>El usuario escribe una palabra descriptiva para buscar una imagen (por ejemplo, "gato", "niño", "paisaje").</p>
        <p>Al pulsar el botón azul, se mostrarán 6 imágenes relacionadas con la búsqueda.</p>
        <p>El usuario selecciona la imagen que desea utilizar.</p>
        <p>Pulsa el botón "Guardar" para agregar la imagen seleccionada.</p>
        <p>Escribe el texto que corresponde a la imagen según las necesidades del usuario.</p>
      
    

    <hr class="step-divider">

    <h4>MI-COMUNICADOR es el Comunicador del usuario, con sus imágenes propias según sus necesidades, y voz al hacer click sobre las palabras.</h4>

    <h5>CONTACTO: Para dudas o ayuda, mandar un mensaje al autor de la aplicación.</h5>
  </div>
</template>

<style scoped>
.about {
  font-family: 'Poppins', sans-serif;
  margin: 20px;
}

h1 {
  font-size: xx-large;
  margin-left: -150px;
  font-weight: bold;
  background: linear-gradient(45deg, #0535d3, #43ddd5); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  margin-top: -70px;
}

p {
  margin-left: -10px;
  background: linear-gradient(45deg, #1916d4, #43ddd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-size: medium;
  font-weight: 800;
}

h2, h3, h4, h5 {
  background: linear-gradient(45deg, #049bf3, #1c3be9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  padding: 10px;
  margin-left: -20PX;
}

h2 {
  font-size: medium;
  margin-left: -170px;
}

h3 {
  font-size: medium;
  margin-left: -170px;
  font-weight: bold;
}

h4 {
  font-size: medium;
  font-weight: bold;
  margin-left: -170px;
}
h5 {
  font-size: medium;
  font-weight: bold;
  margin-left: -170px;
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



</style>
