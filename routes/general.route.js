const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  obtenerLibros,
  crearLibro,
  eliminarLibro,
  actualizarLibro,
} = require("../controllers/libros.controller");

const router = Router();

router.get("/libros", [
  check("usuario").notEmpty().withMessage("El usuario es requerido"),
  validarCampos
], obtenerLibros);

router.post(
  "/libros/crear",
  [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    // check('autor', 'El autor es obligatorio').not().isEmpty(),
    check("sipnosis", "La sipnosis es obligatoria").not().isEmpty(),
    check("portada", "La portada es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearLibro
);

router.put(
  "/libros/actualizar",
  [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    // check('autor', 'El autor es obligatorio').not().isEmpty(),
    check("sipnosis", "La sipnosis es obligatoria").not().isEmpty(),
    check("portada", "La portada es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarLibro
);

router.delete("/libros/eliminar", [], eliminarLibro);

module.exports = router;
