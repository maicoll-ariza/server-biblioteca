const ReservasModel = require("../models/reservas.model");
const LibrosModel = require("../models/libros.model");
const reservasModel = require("../models/reservas.model");

const getReservas = async (req, res) => {
  try {
    const reservas = await ReservasModel.find();
    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const modificarReserva = async (req, res) => {
  const { idUsuario, correoUsuario, idLibro } = req.body;

  try {
    const libroDB = await LibrosModel.findById(idLibro);
    if (!libroDB) {
      return res.status(404).json({
        ok: false,
        message: "El libro que intenta reservar no existe",
      });
    }

    let message = "";
    let reserva;

    const reservaExistente = await ReservasModel.findOne({ idLibro });
    if (reservaExistente) {
      if (idUsuario !== reservaExistente.idUsuario) {
        return res.status(404).json({
          ok: false,
          message: "El libro que trata de reservar no se encuentra disponible",
        });
      }

      await ReservasModel.findByIdAndDelete(reservaExistente._id);
      message = "Reserva eliminada correctamente";
    } else {
      reserva = new ReservasModel({ idLibro, idUsuario, correoUsuario });
      await reserva.save();
      message = "Libro reservado correctamente";
    }
    libroDB.disponible = reserva ? false : true
    await libroDB.save();

    res.json({
      ok: true,
      message,
      reserva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: "Hubo un error al procesar la solicitud",
    });
  }
};


module.exports = {
  getReservas,
  modificarReserva,
};
