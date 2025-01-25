const { errorHandler } = require("../helpers/error_handler");
const Discount = require("../models/Discounts");
const mongoose = require("mongoose");

const addDiscount = async (req, res) => {
  try {
    const { valid_from, valid_to, discount_value } = req.body;
    const newDiscount = await Discount.create({
      valid_from,
      valid_to,
      discount_value,
    });
    res.status(201).redirect("/add_discount");
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).send(discounts)
  } catch (error) {
    errorHandler(error ,res)
  }
}


const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    if (!discounts) {
      return res.status(403).send("Discounts are empty");
    }
    const currentDate = new Date();
    const updatedDiscounts = discounts.map((discount) => {
      const discountObj = discount.toObject();
      const validFromDate = new Date(discountObj.valid_from);
      const validToDate = new Date(discountObj.valid_to);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
      discountObj.valid_from = formatDate(validFromDate);
      discountObj.valid_to = formatDate(validToDate);

      discountObj.isActive =
        currentDate >= validFromDate && currentDate <= validToDate
          ? true
          : false;
      return discountObj;
    });
    res.render("discounts", { discounts: updatedDiscounts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateDiscountById = async (req, res) => {
  try {
    const { discount_id, valid_from, valid_to, discount_value } = req.body;
    if (!mongoose.isValidObjectId(discount_id)) {
      return res.status(400).send({ message: "ID noto'g'ri" });
    }
    const discount = await Discount.findById(discount_id);
    if (!discount) {
      return res.status(404).send({ message: "Discount not found" });
    }
    const updatedDiscount = await Discount.updateOne(
      { _id: discount_id },
      {
        valid_from,
        valid_to,
        discount_value,
      }
    );
    res.status(201).redirect("/discounts");
  } catch (error) {
    errorHandler(error, res);
  }
};

const findDiscountById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "ID noto'g'ri" });
    }
    const discount = await Discount.findById(id);
    if (!discount) {
      return res.status(404).send({ message: "Discount not found" });
    }
    res.status(201).send({ discount });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDiscountById = async (req, res) => {
  try {
    const { discount_id } = req.body;
    if (!mongoose.isValidObjectId(discount_id)) {
      return res.status(400).send({ message: "ID noto'g'ri" });
    }
    const discount = await Discount.findById(discount_id);
    if (!discount) {
      return res.status(404).send({ message: "Discount not found" });
    }
    const deletedDiscount = await Discount.deleteOne({ _id: discount_id });
    res.status(201).redirect("/discounts");
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getAllDiscounts,
  addDiscount,
  findDiscountById,
  updateDiscountById,
  deleteDiscountById,
  getAll
};
