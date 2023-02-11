const express = require("express");
const router = express.Router();
const fs = require("fs");
const PATHROUTES = __dirname;

const removeExtention = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(PATHROUTES).filter((file) => {
  const name = removeExtention(file);
  if (name !== "index") {
    console.log(`Cargando ruta: ${name}`);
    router.use(`/${name}`, require(`./${file}`));
  }
});
module.exports = router;
