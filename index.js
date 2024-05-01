const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config(); // Manejo de variables de entorno en el archivo .env
// Importar el archivo de las rutas
const userRoutes = require('./routes/user')

const app = express();
const port = process.env.PORT || 3200

// Middleware para json
app.use(express.json())

// Middleware para formulario
app.use(express.urlencoded({ extended: true }))

// Middleware para rutas
app.use('/api', userRoutes);
// cors
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hola, desde API REST")
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a la base de datos de MongoDB Atlas"))
    .catch(() => console.error("Error de conexión a la base de datos"))

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
})
