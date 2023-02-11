const { verify_token } = require("../utils/handleJWT");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.send({ error: "Error en la autentificació (No token)!!" });
    }
    const token = req.headers.authorization.split(" ").pop();
    const data_token = await verify_token(token);

    //Comprobamos por el _id que habiamos guardado en el Payload
    if (typeof data_token === "undefined") {
      return res.send({ error: "Error, token no válido!" });
    }
    if (!data_token._id) {
      return res.send({ error: "Error en la autentificació (ID token)!!" });
    }
    next();
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  authMiddleware,
};
