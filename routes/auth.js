const express = require("express");
const Usuario = require(__dirname + "/../models/usuario.js");

let router = express.Router();

router.get("/login", (req, res) => {
    res.render("auth/login");
  });

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    Usuario.findOne({'login': login, 'password': password}).then(resultado => {
        if(resultado) {
            req.session.usuario = resultado;
            res.redirect('../habitaciones');
        } else
        res.render('error', {error: 'Usuario o contraseña incorrectos'});
    }).catch(error => {
        res.render('error', {error: 'Acceso no autorizado'});
    });
});

module.exports = router;


