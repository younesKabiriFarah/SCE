const mongoose = require("mongoose");
const db_connct = () => {
  mongoose.connect("mongodb://localhost:27017/shop", (err, res) => {
    if (err) {
      return console.log(`Error al conectarse a la base de datos: ${err}`);
    }
    console.log("Conexión a la base de datos establecida.");
  });
};
module.exports = db_connct;
