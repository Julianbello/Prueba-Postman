const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Montaje de rutas
app.use('/api', userRoutes);

module.exports = app;