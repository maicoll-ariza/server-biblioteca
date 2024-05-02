const { Schema, model } = require("mongoose");

const LibroSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
  },
  sipnosis: {
    type: String,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  portada: {
    type: String,
    required: true,
  },
});

LibroSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Libros", LibroSchema);
