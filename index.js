require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();

// Lectura y parseo del body (middleware)
app.use(express.json());

// Configuracion de CORS
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.use("/api/general", require("./routes/general.route"));
app.use("/api/favorito", require("./routes/favorito.route"));
// app.use("/api/admin", require("./routes/admin"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
