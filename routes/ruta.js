const { Router } = require("express");
const router = Router();
const { User } = require("../db");

// aca configuramos las rutas.
function checkLogin(req, res, next) {
  if (req.session.user == null) {
    req.flash(
      "errors",
      "Tienes que estar logeado para entrar a esta parte del sistema."
    );
    return res.redirect("/login");
  }

  res.locals.user = req.session.user;

  next();
}

function checkAdmin(req, res, next) {
  if (req.session.user.rol != "ADMIN") {
    req.flash(
      "errors",
      "No tienes permisos de Administrador. No puedes entrar a esta parte del sistema."
    );
    return res.redirect("/usuario");
  }

  next();
}

router.get("/usuario", [checkLogin], (req, res) => {
  const errors = req.flash("errors");
  const mensajes = req.flash("mensajes");

  res.render("usuario", { errors, mensajes });
});

router.get("/admin", [checkLogin, checkAdmin], (req, res) => {
  const errors = req.flash("errors");
  const mensajes = req.flash("mensajes");

  res.render("administrador", { errors, mensajes });
});

module.exports = router;
