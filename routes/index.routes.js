const router = require("express").Router();
const ProductRoute = require("./products.route");
const discountRouter = require("./discount.routes");

router.use("/discount", discountRouter);
router.use("/product", ProductRoute);

module.exports = router;
