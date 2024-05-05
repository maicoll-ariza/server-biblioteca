const FavoritoModel = require("../models/favoritos.model");
const LibrosModel = require("../models/libros.model");

const obtenerFavoritos = async (req, res) => {
  const { usuario } = req.body;

  try {
    const favoritos = await FavoritoModel.find({ usuario });
    res.json({
      ok: true,
      favoritos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const modificarRegistroFavoritos = async (req, res) => {
  const { libro, usuario } = req.body;

  try {
    const libroDB = await LibrosModel.findById(libro);
    if (!libroDB) {
      res.status(404).json({
        ok: false,
        message: "El libro que intenta agregar a favoritos no existe",
      });
      return;
    }

    let message = "";
    let favorito;

    const registroExistente = await FavoritoModel.findOne({ libro, usuario });
    if (registroExistente) {
      await FavoritoModel.findByIdAndDelete(registroExistente._id);
      message = "Libro eliminado de favoritos correctamente";
    } else {
      const favorito = new FavoritoModel({ libro, usuario });
      await favorito.save();
      message = "Libro agregado a favoritos correctamente";
    }

    res.json({
      ok: true,
      message,
      favorito,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

// const eliminarFavorito = async (req, res) => {
//   const { id } = req.body;

//   try {
//     const favoritoDB = await FavoritoModel.findById(id);
//     if (!favoritoDB) {
//       res.status(404).json({
//         ok: false,
//         message: "El favorito que intenta eliminar no existe",
//       });
//       return;
//     }

//     await FavoritoModel.findByIdAndDelete(id);

//     res.json({
//       ok: true,
//       message: "Favorito eliminado correctamente",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       ok: false,
//       error,
//     });
//   }
// };

module.exports = {
  obtenerFavoritos,
  modificarRegistroFavoritos,
  // eliminarFavorito,
};
