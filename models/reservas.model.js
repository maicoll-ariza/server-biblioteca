const { Schema, model } = require("mongoose");

const ReservaSchema = Schema({
  idUsuario: {
    type: String,
    required: true,
  },
  correoUsuario: {
    type: String,
    required: true,
  },
  idLibro: {
    type: Schema.Types.ObjectId,
    ref: "Libros",
    required: true,
  },
  fechaReserva: {
    type: Date,
    default: Date.now,
  },
});

ReservaSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Reserva", ReservaSchema);
