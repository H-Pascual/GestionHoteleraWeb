const mongoose = require('mongoose');

let incidenciasSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        default: Date.now(),
    },
    fechaFin: {
        type: Date,
    },
    imagen: {
        type: String,
    }
});

let habitacionSchema = new mongoose.Schema({
    numero: {
        type: Number,
        min: [1, 'El número mínimo es 1'],
        max: [100, 'El número máximo es 100'],
        required: [true, 'El número es obligatorio'],
    },
    tipo: {
        type: String,
        enum: ['individual', 'doble', 'familiar', 'suite'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    ultimaLimpieza: {
        type: Date,
        required: [true, 'La última limpieza es obligatoria'],
        default: Date.now(),
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio mínimo es 0€'],
        max: [250, 'El precio máximo es 250€'],
    },
    imagen: {
        type: String,
    },
    incidencias: [incidenciasSchema],
});

let Habitacion = mongoose.model('habitaciones', habitacionSchema);
module.exports =  Habitacion;