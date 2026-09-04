// Simulación de base de datos en memoria
const usersDB = [
  { id: 1, name: 'Carlos', email: 'carlos@example.com' },
  { id: 2, name: 'Ana', email: 'ana@example.com' }
];

class UserModel {

  static getAll() {
    return usersDB;
  }

  static getById(id) {
    return usersDB.find(user => user.id === id);
  }

  static create(userData) {
    const newUser = {
      id: usersDB.length + 1,
      ...userData
    };

    usersDB.push(newUser);
    return newUser;
  }

  static update(id, updateData) {
    const index = usersDB.findIndex(user => user.id === id);

    if (index === -1) return null;

    usersDB[index] = {
      ...usersDB[index],
      ...updateData
    };

    return usersDB[index];
  }
}

module.exports = UserModel;