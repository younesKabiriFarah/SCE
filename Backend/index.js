"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db_connct = require("./config/mongo");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("storage")); //Indicamos la carpeta pública.

//Metodos de escucha
app.get("/hola/:name", (req, res) => {
  res.send({ message: `Hola ${req.params.name}!` });
});

/**
 * Invocamos a las rutas
 */
app.use("/api", require("./routes"));

/**
 * Inicializar app
 */
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
  db_connct();
});
