const { fileModel } = require("../models");
const publib_url = process.env.PUBLIC_URL;

/**
 * Metodo para obtener una imagen.
 * @param {} req
 * @param {*} res
 */
const getImage = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await fileModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};

const getImages = async (req, res) => {
  const data = await fileModel.find({});
  res.send({ data });
};

const createImage = async (req, res) => {
  const { body, file } = req;
  const file_data = {
    name: file.filename,
    url: `${publib_url}/${file.filename}`,
  };

  const data = await fileModel.create(file_data);
  res.send({ message: data });
};

const deleteImage = async (req, res) => {
  res.send({ message: "Delete image" });
};

module.exports = { createImage, getImage, getImages, deleteImage };
