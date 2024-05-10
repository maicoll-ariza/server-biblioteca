const LibrosModel = require("../models/libros.model");
const ReservasModel = require("../models/reservas.model");
const FavoritosModel = require("../models/favoritos.model");


const obtenerLibros = async (req, res) => {
  const { titulo, autor, usuario } = req.body;

  const regexTitulo = titulo ? new RegExp(titulo, "i") : /.*/;
  const regexAutor = autor ? new RegExp(autor, "i") : /.*/;

  try {
    let query = {}; // Inicializamos una consulta vacía

    // Si alguno de los parámetros está presente, agregamos la condición correspondiente
    if (titulo || autor) {
      query.$or = [{ titulo: regexTitulo }, { autor: regexAutor }];
    }

    const [libros, reservasPorUsuario, favoritosPorUsuario] = await Promise.all(
      [
        await LibrosModel.find(query),
        await ReservasModel.find({ idUsuario: usuario }, "idUsuario idLibro"),
        await FavoritosModel.find({ usuario }),
      ]
    );

    const listadoLibrosInfo = libros.map((libro) => {
      const libroObjeto = libro.toObject(); // Convertimos el objeto de mongoose a un objeto JSON
      libroObjeto.reservadoPorUsuario = reservasPorUsuario.some(
        (reserva) =>
          reserva.idUsuario === usuario &&
          reserva.idLibro.toString() === libro._id.toString()
      );
      libroObjeto.esFavorito = favoritosPorUsuario.some(
        (favorito) =>
          favorito.usuario === usuario &&
          favorito.libro.toString() === libro._id.toString()
      );
      delete libroObjeto.__v;
      return libroObjeto;
    });

    // ordenar libros por favoritos
    listadoLibrosInfo.sort((a, b) => {
      if (a.esFavorito && !b.esFavorito) {
        return -1;
      } else if (!a.esFavorito && b.esFavorito) {
        return 1;
      } else {
        return 0;
      }
    });

    res.json({
      ok: true,
      listadoLibrosInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const crearLibro = async (req, res) => {
  try {
    const libro = new LibrosModel(req.body);
    await libro.save();

    res.json({
      ok: true,
      message: "Libro creado correctamente",
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

actualizarLibro = async (req, res) => {
  const { id, ...body } = req.body;

  try {
    const libroDB = await LibrosModel.findById(id);
    if (!libroDB) {
      res.status(404).json({
        ok: false,
        message: "El libro que intenta actualizar no existe",
      });
      return;
    }

    if (libroDB.disponible === false) {
      res.status(404).json({
        ok: false,
        message: "No se puede actualizar un libro que está reservado",
      });
      return;
    }

    const libro = await LibrosModel.findByIdAndUpdate(id, body, {
      new: true, // devuelve el documento actualizado
    });
    res.json({
      ok: true,
      message: "Libro actualizado correctamente",
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

eliminarLibro = async (req, res) => {
  const { id } = req.body;

  try {
    const libroDB = await LibrosModel.findById(id);
    if (!libroDB) {
      res.status(404).json({
        ok: false,
        message: "El libro que intenta eliminar no existe",
      });
      return;
    }

    if (libroDB.disponible === false) {
      res.status(404).json({
        ok: false,
        message: "No se puede eliminar un libro que está reservado",
      });
      return;
    }
    const [reserva, favorito] = await Promise.all([
      ReservasModel.findOne({ idLibro: id }),
      FavoritosModel.findOne({ libro: id }),
    ]);

    if (reserva) {
      await ReservasModel.findByIdAndDelete(reserva._id);
    }

    if (favorito) {
      await FavoritosModel.findByIdAndDelete(favorito._id);
    }

    await LibrosModel.findByIdAndDelete(id);
    res.json({
      ok: true,
      message: "Libro eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
};
