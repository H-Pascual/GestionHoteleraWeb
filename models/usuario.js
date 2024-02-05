const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  login: {
    type: String,
    trim:true,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    min: [4, 'El nombre tiene que tener mínimo de 4 letras']    
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'La contraseña es obligatoria'],
    min: [7, 'La contraseña tiene que tener un mínimo de 7 letras']
  }
});

const Usuario = mongoose.model('usuarios', usuarioSchema);

module.exports = Usuario;