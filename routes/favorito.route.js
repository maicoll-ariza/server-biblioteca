const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  obtenerFavoritos,
  modificarRegistroFavoritos,
  //   eliminarFavorito,
} = require("../controllers/favoritos.controller");

const router = Router();

router.get(
  "/obtenerPorUsuario",
  [
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  obtenerFavoritos
);

router.post(
  "/modificar",
  [
    check("libro", "El libro es obligatorio").not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  modificarRegistroFavoritos
);

// router.delete('/eliminar', [
//     check('id', 'El id es obligatorio').not().isEmpty(),
//     validarCampos
// ], eliminarFavorito);

module.exports = router;
