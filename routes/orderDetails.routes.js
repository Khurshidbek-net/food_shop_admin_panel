const { getAllOrderDetails, getOrderDetailById, addOrderDetail, updateOrderDetail, deleteOrderDetailById } = require("../controllers/orderDetails.controller");

const router = require("express").Router();

router.get("/all", getAllOrderDetails)
router.get("/:id", getOrderDetailById)
router.post("/add", addOrderDetail)
router.put("/:id", updateOrderDetail)
router.delete("/:id", deleteOrderDetailById)

module.exports = router;
