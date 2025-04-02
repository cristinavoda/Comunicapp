<template>
  <div id="contact-form-container">
    <div class="float-box">
      <h1>Contacto</h1>
      
      <form action="https://formsubmit.co/cristinavoda483@gmail.com" method="POST">
  <input type="text" name="name" placeholder="Tu nombre" required />
  <input type="email" name="email" placeholder="Tu correo" required />
  <textarea name="message" placeholder="Tu mensaje" required></textarea>
  <button type="submit">Enviar</button>
</form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  message: "",
  subscribe: false,
});

const handleSubmit = () => {
  console.log("Formulario enviado:", form.value);
  alert("¡Gracias por tu mensaje!");
};
</script>

<style>

#contact-form-container {
  display: flex;
  justify-content: center;
  margin-left: -30px;
  align-items: center;
  width: 280px;
  height:480px;
  background-color:transparent;
}

.float-box {
  width: 90%;
  max-width: 300px;
  min-width:200px;
  margin-left:-200px; 
  margin-right: 50 px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(15, 138, 117, 0.89);
  padding: 40px;
  text-align: center;
}

h2 {
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: bold;
  background: linear-gradient(45deg, #2a045c, #43ddd5); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  margin-left: -50px;}



form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  margin-left: -20px;
  font-size: 16px;
  background-color: rgb(252, 255, 255);
  border: 2px solid #eef1f1;
  border-radius: 5px;
}

textarea {
  resize: none;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: #dfe8e4;
  background-color:  #10b6ae; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #6ba4e2;
}
</style>
