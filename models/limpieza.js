const mongoose = require('mongoose');

let limpiezaSchema = new mongoose.Schema({
        idHabitacion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'habitacion'
        },
        fechaHora: {
            type: Date,
            required: [true, 'La fecha es obligatoria'],
            default: Date.now(),
        },
        observaciones: {
            type: String,
        },
});

let Limpieza = mongoose.model('limpiezas', limpiezaSchema);
module.exports =  Limpieza;