<<<<<<< HEAD
=======
# COMUNICADOR 🗣️📱

COMUNICADOR es una aplicación diseñada para personas no verbales con condiciones como autismo, ictus, parálisis cerebral o Alzheimer. Proporciona un sistema visual y auditivo que permite la comunicación a través de imágenes y voz.

## 🚀 Funcionalidades principales

### 📌 **COMUNICADOR** (DEMO)

- Incluye imágenes predefinidas y síntesis de voz.
- Al hacer clic sobre las palabras, se reproducirá el audio correspondiente.

### 📌 **ACTUALIZARCOMUNICADOR** (Personalización)

- **Subir imagen personal:** Permite reemplazar imágenes y editar las palabras asociadas.
- **Buscar en Pixabay:** Opción para encontrar imágenes en Internet.
- **Almacenamiento:** Se usa Vuex y LocalStorage para guardar imágenes personalizadas.

### 📌 **MICOMUNICADOR** (Personalización total)

- El usuario puede crear su propio comunicador con imágenes personalizadas y voz.
- Se adapta a las necesidades individuales del usuario.

### 📌 **CONTACTO**

- Sección para enviar un mensaje al autor en caso de dudas o solicitud de ayuda.

## 🛠️ Tecnologías utilizadas

- **Frontend:** JavaScript, Vue.js, HTML, CSS.
- **Gestión de estado:** Vuex (para guardar imágenes y configuraciones personalizadas).
- **Backend:** Implementación de un servicio para el envío de correos.
- **Integraciones:** Pixabay API para la búsqueda de imágenes.

## 📂 Estructura del código

```
comunicapp/
│-- src/
│   ├── components/       # Componentes reutilizables
│   ├── views/            # Vistas principales (Comunicador, Galería, Contacto...)
│   ├── store/            # Vuex store (gestión de imágenes y configuración)
│   ├── router/           # Vue Router (gestión de navegación entre vistas)
│   ├── assets/           # Imágenes y estilos
│   ├── App.vue           # Componente principal
│   ├── main.js           # Archivo principal de configuración
│-- public/               # Archivos estáticos
│-- package.json          # Dependencias y scripts de npm
│-- README.md             # Información del proyecto
```

## 📥 Instalación y ejecución

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/cristinavoda/Comunicapp.git
   ```
2. Entrar en la carpeta del proyecto:
   ```sh
   cd Comunicapp
   ```
3. Instalar dependencias:
   ```sh
   npm install
   ```
4. Ejecutar la aplicación en modo desarrollo:
   ```sh
   npm run serve
   ```
5. Acceder a la aplicación en el navegador:
   ```
   http://localhost:8080/
   ```

## 📬 Contacto

Para dudas o sugerencias, puedes enviar un mensaje al autor.

---

¡Esperamos que COMUNICADOR sea una herramienta útil para muchas personas! 💙

❤️❤️
>>>>>>> 26dcd8371c911a2073d3cd447d86638b4ab9ad5d
