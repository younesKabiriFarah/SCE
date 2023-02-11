const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const { token_sign } = require("../utils/handleJWT");

/**
 * Función para loguear a un usuario.
 */
const login = async (req, res, next) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(403).send({ message: "Usuario no existe!" });
    }

    const check = await compare(req.body.password, user.password);

    if (!check) {
      return res.status(403).send({ message: "Error en login!" });
    }

    let us = user;
    us.password = "hidden";

    const result = {
      token: await token_sign(user),
      user: us,
    };

    return res.send({ message: "todo correcto", data: result });
  } catch (e) {
    console.error(e);
  }
};

/**
 * Función para registrar a un usuario.
 */
const register = async (req, res, next) => {
  try {
    const passwprd_hashed = await encrypt(req.body.password);
    const data = { ...req.body, password: passwprd_hashed };

    const user = await usersModel.create(data);
    user.set("password", undefined, { strict: false }); //No devolver el campo password en la respuesta.

    let us = user;
    us.password = "hidden";

    const result = {
      token: await token_sign(user),
      user: us,
    };
    res.send(JSON.stringify(result));
  } catch (e) {
    console.error(e);
  }
};
module.exports = { login, register };
