const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN_LOCAL)
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.log('Conexión a la base de datos fallida', error);
  }
}

module.exports = {
  dbConnection
}
