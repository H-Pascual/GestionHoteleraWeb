/* HÉCTOR PASCUAL MARÍN 2º DAW */
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const session = require('express-session');
const methodOverride = require('method-override');

const limpiezas = require(__dirname + '/routes/limpiezas');
const habitaciones = require(__dirname + '/routes/habitaciones');
const auth = require(__dirname + "/routes/auth");

dotenv.config();

mongoose.connect(process.env.URL);

let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: false
}));

app.set('view engine', 'njk');
app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: false,
  expires: new Date(Date.now() + (30 * 60 * 1000))
}));
app.use(express.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use('/limpiezas', limpiezas);
app.use('/habitaciones', habitaciones);
app.use("/auth", auth);

app.listen(process.env.PUERTO);