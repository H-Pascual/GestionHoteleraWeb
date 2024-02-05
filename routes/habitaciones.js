const express = require("express");

const upload = require(__dirname + "/../utils/uploads.js");
let Habitacion = require(__dirname + "/../models/habitacion.js");
const auth = require(__dirname + '/../auth/auth.js');
let router = express.Router();

router.get("/nueva", auth.autenticacion, (req, res) => {
  res.render("habitaciones/habitaciones_nueva");
});

router.get("/:id", (req, res) => {
  Habitacion.findById(req.params.id)
    .then((resultado) => {
      if (resultado)
        res.render("habitaciones/habitaciones_ficha", {
          habitacion: resultado,
        });
      else res.render("error", { error: "No se han encontrado habitaciones" });
    })
    .catch((error) => {
      res.render("error", { error: "Error buscando la habitación indicada" });
    });
});

router.get("/", (req, res) => {
  Habitacion.find()
    .then((resultado) => {
      res.render("habitaciones/habitaciones_listado", {
        habitaciones: resultado,
      });
    })
    .catch((error) => {
      res.render("error", { error: "Error obteniendo habitaciones" });
    });
});

router.post('/:idHabitacion/incidencias/:id', auth.autenticacion, (req, res) => {
  Habitacion.findById(req.params.idHabitacion).then((resultado) => {
    const incidencia = resultado.incidencias.find(incidencia => incidencia._id.toString() === req.params.id);
    if (incidencia) {
      incidencia.fechaFin = Date.now();
      resultado.save().then(() => {
        res.redirect(req.baseUrl);
      }).catch((error) => {
        res.render("error", { error: "Error cerrando incidencia" });
      });
    }
    else {
      res.render("error", { error: "Incidencia no encontrada" });
    }
  }).catch((error) => {
    res.render("error", { error: "Habitación no encontrada" });
  });
});

router.post('/:id/incidencias', auth.autenticacion, upload.upload.single('imagen'), (req, res) => {
  Habitacion.findById(req.params.id).then((resultado) => {
    if(resultado) {
        let nuevaIncidencia = { descripcion: req.body.descripcion};
        if (req.file){
          nuevaIncidencia.imagen = req.file.filename;
        } 
        resultado.incidencias.push(nuevaIncidencia);
          resultado.save().then(() => {
            res.redirect("/habitaciones/" + req.params.id);
          }).catch((error2) => {
            let errores = { general: "Error editando habitación" };
            if (error2.errors.precio) {
              errores.precio = error2.errors.precio.message;
            }
            res.render("habitaciones/habitaciones_ficha", {
              errores: errores,
              datos: req.body,
            });
        });
    } else {
        res.render("error", { error: "Incidencia no encontrada" });
      }
  }).catch((error) => {
    res.render("error", { error: "Error creando incidencia" });
  });
});

router.post("/", auth.autenticacion, upload.upload.single('imagen'), (req, res) => {
  let nuevaHabitacion = new Habitacion({
    numero: req.body.numero,
    tipo: req.body.tipo,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
  });
  if (req.file){
    nuevaHabitacion.imagen = req.file.filename;
  } 
  nuevaHabitacion
    .save()
    .then((resultado) => {
      res.redirect(req.baseUrl);
    })
    .catch((error) => {
      let errores = {
        general: "Error insertando habitación",
      };
      if (error.errors.numero) {
        errores.numero = error.errors.numero.message;
      }
      if (error.errors.tipo) {
        errores.tipo = error.errors.tipo.message;
      }
      if (error.errors.descripcion) {
        errores.descripcion = error.errors.descripcion.message;
      }
      if (error.errors.precio) {
        errores.precio = error.errors.precio.message;
      }
      res.render("habitaciones/habitaciones_nueva", { errores: errores, datos: req.body });
    });
});

router.delete("/:id", auth.autenticacion, (req, res) => {
  Habitacion.findByIdAndDelete(req.params.id)
    .then((resultado) => {
      res.redirect(req.baseUrl);
    })
    .catch((error) => {
      res.render("error", { error: "Error borrando habitación" });
    });
});

module.exports = router;
