const bcryptjs = require("bcryptjs");
/**
 * Función para encriptar la contraseña.
 * @param {*} password_plane //Contraseña en texto plano.
 */
const encrypt = async (password_plane) => {
  const hash = await bcryptjs.hash(password_plane, 15);
  return hash;
};

/**
 * Función para comparar una contraseña en texto plano con un hash.
 * @param {*} password_plane
 * @param {*} hash_password
 */
const compare = async (password_plane, hash_password) => {
  return await bcryptjs.compare(password_plane, hash_password);
};

module.exports = {
  encrypt,
  compare,
};
