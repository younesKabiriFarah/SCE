const { json } = require("body-parser");
const { produstModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * Obtener los todos los productos de la base de datos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProducts = async (req, res, next) => {
  try {
    const data = await produstModel.find({});
    res.send(JSON.stringify(data));
  } catch (e) {
    handleHttpError(res, "Error_Get_Products");
  }
};

/**
 * Obtener detalles de un producto en concreto de la base de datos.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await produstModel.findById(id);
    return res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_Get_Product");
  }
};

/**
 * Creamos un producto en la base de datos.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createProduct = async (req, res, next) => {
  const { body } = req;
  const data = await produstModel.create(body);
  res.send(JSON.stringify(data));
};

/**
 * Actualizar un producto de la base de datos.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateProduct = (req, res, next) => {
  res.send({ message: "update Product" });
};

/**
 * Eliminar un producto de la base de datos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await produstModel.deleteOne({ _id: id });
    return res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_Get_Product");
  }
};

/**
 * Obtener un producto a partir de su categoria.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProductByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const data = await produstModel.find({ category: category });
    return res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_Get_Product");
  }
};

/**
 * Obtener un producto a partir de su categoria.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProductBySome = async (req, res, next) => {
  try {
    const value = req.params.value;
    //const data = await produstModel.findOne({"city" : /.*`${value}`.*/});
    let searchName = await produstModel
      .find({ name: { $regex: new RegExp("^" + value + ".*", "i") } })
      .exec();
    let searchCity = await produstModel
      .find({ city: { $regex: new RegExp("^" + value + ".*", "i") } })
      .exec();
    let finalSearch = [...searchName, ...searchCity];
    return res.send(JSON.stringify({ data: finalSearch }));
  } catch (e) {
    handleHttpError(res, "Error_Get_Product");
  }
};

/**
 * Obtener un producto a partir de un precio.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProductPrice = async (req, res, next) => {
  try {
    const value = Number(req.params.value.replace(/,/, ".")); //Convertir punto en coma.
    if (!isNaN(value)) {
      //Comprobar si el valor es válido.
      const data = await produstModel.find({ price: { $lt: value } }); //Buscar precios más baratos.
      return res.send(JSON.stringify(data));
    } else {
      return res.send(JSON.stringify({ message: "Valor no válido " }));
    }
  } catch (e) {
    handleHttpError(res, "Error_Get_Product");
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductBySome,
  getProductPrice,
};
