const jwt = require("jsonwebtoken");
const secret_word = process.env.SECRET_WORD;
/**
 * Metodo para firmar un token
 * @param {*} user //Objecto user para tratar.
 */
const token_sign = async (user) => {
  const sign = await jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    secret_word,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

/**
 * Método para comprobar si el token recibido es nuestro.
 * @param {*} token // Toren a verificar
 * @returns         // Retornamos el resultado de la verificación.
 */
const verify_token = async (token) => {
  try {
    return jwt.verify(token, secret_word);
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  token_sign,
  verify_token,
};
