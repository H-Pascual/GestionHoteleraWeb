let autenticacion = (req, res, next) => {
    if (req.session && req.session.usuario) return next();
    else res.render("auth/login");
  };
module.exports = {
    autenticacion: autenticacion,
}