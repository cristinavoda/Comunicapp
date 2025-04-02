require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu correo (usa un correo de Gmail)
    pass: process.env.EMAIL_PASS, // Contraseña o "App Password" (ver abajo)
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "vodacristina483@gmail.com",
    subject: "Nuevo mensaje de contacto",
    text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ success: false, message: "Error enviando el correo" });
  }
});

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));
