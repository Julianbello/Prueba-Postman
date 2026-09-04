const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Definición de endpoints

// GET: Obtener todos los usuarios
router.get('/users', userController.getUsers);

// GET: Obtener un usuario por ID
router.get('/users/:id', userController.getUserById);

// POST: Crear un nuevo usuario
router.post('/users', userController.createUser);

// PUT: Actualizar un usuario
router.put('/users/:id', userController.updateUser);

module.exports = router;