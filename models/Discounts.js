const { Schema, model } = require("mongoose");

const discountSchema = new Schema(
  {
    valid_from: { type: Date, required: true },
    valid_to: { type: Date, required: true },
    discount_value: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Discount", discountSchema);
