const UserModel = require('../models/userModel');

// GET: Obtener todos los usuarios
const getUsers = (req, res) => {
  try {
    const users = UserModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// GET: Obtener un usuario por ID
const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = UserModel.getById(id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el usuario',
      error: error.message
    });
  }
};

// POST: Crear un nuevo usuario
const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Los campos name y email son obligatorios'
      });
    }

    const newUser = UserModel.create({ name, email });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el usuario',
      error: error.message
    });
  }
};

// PUT: Actualizar un usuario existente
const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedUser = UserModel.update(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser
};