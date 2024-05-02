const { Schema, model } = require('mongoose');

const favoritosSchema = Schema({
  //TODO: Verificar si se va a manejar el modelo de usuario
    // usuario: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario',
    //     required: true
    // },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libros',
        required: true
    },
    usuario: {
      type: String,
      required: true
    }
});

favoritosSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Favoritos', favoritosSchema);