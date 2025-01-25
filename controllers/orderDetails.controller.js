const OrderDetails = require("../models/OrderDetails");
const { orderDetailsValidation } = require("../validations/orderDetails.validation");

const getAllOrderDetails = async (req, res) => {
  try {
    const data = await OrderDetails.find({});
    if (data == {}) {
      res
        .status(201)
        .send({ message: "Xozircha hech qanday orderDetails yo'q!" });
    }
    console.log(data);

    res.status(201).send({ message: "Success", data: data });
  } catch (error) {
    console.log("Error getAllOrderDetails: ", error.message);
  }
};

const getOrderDetailById = async (req, res) => {
  try {
    const data = await OrderDetails.findOne(
      { id: req.params.id }
    );
    if (data == {}) {
      res
        .status(201)
        .send({ message: "Xozircha bunday ID lik orderDetail yo'q!" });
    }
    res.status(201).send({ message: "Success", data: data })
  } catch (error) {
    console.log("Error getOrderDetailById: ", error.message);
  }
};

const addOrderDetail = async (req, res) => {
    try {
        const { error, value } = orderDetailsValidation(req.body)
        if(error){
            res.status(403).send({message: "orderDetail validationdan o'ta olmadi!", error: error})
        }
        const data = await OrderDetails.create({ ...value })
        res.status(200).send({ message: "Success", data: data })
    } catch (error) {
        console.log("Error addOrderDetail: ", error.message);
    }
}

const updateOrderDetail = async (req, res) => {
    try {
        const id = req.params.id
        const { error, value } = orderDetailsValidation(req.body)
        if(error){
            res.status(403).send({message: "orderDetail validationdan o'ta olmadi!", error: error})
        }
        const data = await OrderDetails.findByIdAndUpdate(id, { ...value }, {new: true})
        res.status(203).send({ message: "Success", updatedData: data })
    } catch (error) {
        console.log("Error updateOrderDetail: ", error.message);
        res.status(404).send({error: error.message})
    }
}

const deleteOrderDetailById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await OrderDetails.findByIdAndDelete(id)
        {
          res
            .status(201)
            .send({ message: "Success", deletedData: data });
        }
    } catch (error) {
        console.log("Error deleteOrderDetail: ", error.message);
    }
}

module.exports = {
  getAllOrderDetails,
  getOrderDetailById,
  addOrderDetail,
  updateOrderDetail,
  deleteOrderDetailById,
};