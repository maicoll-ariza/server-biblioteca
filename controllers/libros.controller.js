const librosModel = require("../models/libros.model");
const LibrosModel = require("../models/libros.model");

const obtenerLibros = async (req, res) => {
  const { titulo, autor } = req.body;

  const regexTitulo = titulo ? new RegExp(titulo, "i") : /.*/;
  const regexAutor = autor ? new RegExp(autor, "i") : /.*/;

  try {
    let query = {}; // Inicializamos una consulta vacía

    // Si alguno de los parámetros está presente, agregamos la condición correspondiente
    if (titulo || autor) {
      query.$or = [{ titulo: regexTitulo }, { autor: regexAutor }];
    }
    const libros = await LibrosModel.find(query);

    res.json({
      ok: true,
      libros,
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

    const libroDB = await librosModel.findById(id);
    if (!libroDB) {
      res.status(404).json({
        ok: false,
        message: "El libro que intenta actualizar no existe",
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
    const libroDB = await librosModel.findById(id);
    if (!libroDB) {
      res.status(404).json({
        ok: false,
        message: "El libro que intenta eliminar no existe",
      });
      return;
    }

    await LibrosModel.findByIdAndDelete(id);
    res.json({
      ok: true,
      message: "Libro eliminado correctamente",
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
}


module.exports = {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
};
