const Product = require("../models/Products");
const { errorHandler } = require("../helpers/error_handler");
const { productValidationSchema } = require("../validations/products.validation")

const mongoose = require("mongoose")

const addProduct = async (req, res) => {
  try {
    const imageUrl = req.file ? `${req.file.filename}` : null;

    console.log(req.file.filename)

    const data = JSON.parse(req.body.data)

    const { error, value } = productValidationSchema(data);

    if (error) {
      return res.status(400).send(error)
    }

    const { name, description, price, stock, category_id, discount_id } = value;




    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category_id,
      discount_id,
      image: imageUrl,
    });

    res.status(201).send({ msg: 'New Product added', newProduct });

  } catch (error) {
    console.log(1)
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

    const data = JSON.parse(req.body.data);
    if (req.file) {
      console.log(req.file)
      console.log("imagecome");
      data.image = `${req.file.filename}`;
    }

    const update = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!update) {
      return res.status(404).send({ msg: "Product not found." });
    }

    return res.status(200).send(update);
  } catch (error) {
    console.log("Hato")
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
