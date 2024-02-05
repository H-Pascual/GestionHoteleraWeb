const express = require("express");

let Limpieza = require(__dirname + "/../models/limpieza.js");
const auth = require(__dirname + '/../auth/auth.js');
let router = express.Router();

router.get('/:id/nueva', auth.autenticacion, (req, res) => {
  const idHabitacion = req.params.id;
  res.render("limpiezas/limpiezas_nueva", { idHabitacion });
});

router.get('/:id', (req, res) => {
  Limpieza.find({idHabitacion : req.params.id}).then((resultado) => {
      if (resultado)
        res.render("limpiezas/limpiezas_listado", { limpiezas: resultado, idHabitacion: req.params.id });
        
      else res.render("error", { error: "Error obteniendo limpiezas" });
    })
    .catch((error) => {
      res.render("error", { error: "Error obteniendo limpiezas" });
    });
});

router.post('/', auth.autenticacion, (req, res) => {
  let nuevaLimpieza = new Limpieza({
    idHabitacion: req.body.idHabitacion,
    fechaHora: req.body.fechaHora,
    observaciones: req.body.observaciones,
  });
  nuevaLimpieza.save().then((resultado) => {
    res.redirect('../habitaciones');
  }).catch((error) => {
    let errores = {
      general: "Error insertando habitación",
    };
    if (error.errors.fechaHora) {
      errores.fechaHora = error.errors.fechaHora.message;
    }
  });
});

module.exports = router;
