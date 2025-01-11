const Product = require("../models/Products");
const {productValidationSchema} = require("../validations/products.validation");
const { errorHandler } = require("../helpers/error_handler");

const addProduct = async (req, res) => {
  try {
    const { error, value } = productValidationSchema(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newProduct = await Product.create(value);

    res.status(201).send({ msg: "New Product added", newProduct });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getByQuery = async (req, res) => {
  try {
    const { category } = req.query;
    const found = await Product.find({ category });
    if (!found) {
      return res.status(404).send({ msg: "Product not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const found = await Product.find({});
    if (!found) {
      return res.status(404).send({ msg: "Products not found" });
    }
    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const found = await Product.findById(id);
    if (!found) {
      return res.status(404).send({ msg: "Product topilmadi." });
    }

    return res.status(200).send(found);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
      return res.status(404).send({ msg: "Product topilmadi." });
    }
    return res.status(200).send(update);
  } catch (error) {
    errorHandler(error, res);
  }
};


const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ msg: "Product topilmadi." });
    }
    return res.status(200).send(deleted);
  } catch (error) {
    errorHandler(error, res);
  }
};


module.exports = {
  addProduct,
  getByQuery,
  getAll,
  getById,
  updateById,
  deleteById,
};
