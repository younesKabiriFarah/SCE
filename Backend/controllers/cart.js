const { cartModel } = require("../models");

/**
 * Función para añadir producto a la colección de carrito.
 */
const createCartItem = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await cartModel.create(body);
    if (!result) {
      return res.send({
        error: "No se ha podido añadir el item correctamente!",
      });
    }
    res.send({ data: result });
  } catch (e) {
    console.error(e);
  }
};

/**
 * Función para obtener los productos del carrito de un usuario.
 */
const getCartsItem = async (req, res, next) => {
  try {
    const items = await cartModel.find({ id_user: req.params.id });
    if (items.length == 0) {
      return res.send({ error: "Producto no encontrado!" });
    }

    return res.send({ message: "todo correcto", data: items });
  } catch (e) {
    console.error(e);
  }
};

/**
 * Función para eliminar un producto del carrito de un usuario.
 */
const deleteCartsItem = async (req, res, next) => {
  try {
    try {
      const id = req.params.id;
      const product = cartModel.find({ _id: id });
      if (product.length == 0) {
        return res.send({ error: "Producto no encontrado!" });
      }

      const result = await cartModel.deleteOne({ _id: id });
      if (!result) {
        return res.send({
          error: "Error a la hora de borra producto en carrito!",
        });
      }
      const resu = await cartModel.find({ id_user: product.id_user });
      return res.send({ message: "Item borrado correctamente!" });
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
};
module.exports = {
  createCartItem,
  getCartsItem,
  deleteCartsItem,
};
