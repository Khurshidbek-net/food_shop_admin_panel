const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: String,
      default: "",
      maxLength: 300,
    },
    price: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
    category_id: {
      type: String,
      required: true,
    },
    discount_id: {
      type: String,
      required: true,
    },
    image: {
      type: String
    }
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
  }
);

module.exports = model("Product", productSchema);
