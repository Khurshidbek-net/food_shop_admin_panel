const { Schema, model } = require("mongoose");

const orderDetailsSchema = new Schema({
  id: { type: String },
  name: { type: String },
  order_id: { type: String },
  product_id: { type: String },
  quantity: { type: Number },
  price: { type: Number}
});
module.exports = model("OrderDetails", orderDetailsSchema)