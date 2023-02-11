const { json } = require("body-parser");
const { produstModel } = require("../models");

/**
 * Obtener los todos las caterorias de los productores de base de datos
 */
const getCategorys = async (req, res, next) => {
  try {
    const category_list = []; //Este array contendrá valores repetidos.
    const data = await produstModel.find({});
    data.forEach(function (value, index, array) {
      category_list.push(value.category);
    });
    const uniqueCategory = [...new Set(category_list)]; //Un array con valores únicos(No repetidos).
    res.send(JSON.stringify(uniqueCategory));
  } catch (e) {
    console.error(e);
  }
};

const getCitys = async (req, res, next) => {
  try {
    const citys_list = []; //Este array contendrá valores repetidos.
    const data = await produstModel.find({});
    data.forEach(function (value, index, array) {
      citys_list.push(value.city);
    });
    const uniqueCitys = [...new Set(citys_list)]; //Un array con valores únicos(No repetidos).
    res.send(JSON.stringify(uniqueCitys));
  } catch (e) {
    console.error(e);
  }
};
module.exports = { getCategorys, getCitys };
