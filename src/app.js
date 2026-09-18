const path = require('path');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Sirve los archivos de src/ (incluido main.js) en la ruta /src
app.use('/src', express.static(__dirname));

// Sirve el index.html de la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use('/api', userRoutes);

module.exports = app;