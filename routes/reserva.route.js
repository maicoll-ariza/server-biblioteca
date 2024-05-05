const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { getReservas, modificarReserva } = require("../controllers/reservas.controller");

const router = Router();

router.get("/", [], getReservas);

router.post(
  "/modificar",
  [
    check("idUsuario").notEmpty().withMessage("El idUsusario es requerido"),
    check("idLibro").notEmpty().withMessage("El idLibro es requerido"),
    check("correoUsuario")
      .notEmpty()
      .withMessage("El correoUsuario es requerido"),
    validarCampos,
  ],
  modificarReserva
);

module.exports = router;