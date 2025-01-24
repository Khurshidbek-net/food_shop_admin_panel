const router = require("express").Router();
const ProductRoute = require("./products.route");
const orderDetailRoute = require("./orderDetails.routes");

router.use("/product", ProductRoute);
router.use("/orderDetail", orderDetailRoute)

module.exports = router;
