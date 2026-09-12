const express = require('express');
const cors = require('cors'); // 1. Importas cors
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors()); // 2. Habilitas cors (siempre antes de tus rutas)
app.use(express.json());
app.use('/api', userRoutes); // Tus rutas originales se mantienen aquí

module.exports = app;