const router = require("express").Router();

const  categoryRoute = require("./category.routes");
const adminRoute = require("./admin.routes");
const ProductRoute = require("./products.route");
const discountRouter = require("./discount.routes");


router.use("/product", ProductRoute);
router.use("/category", categoryRoute);
router.use("/admin", adminRoute);
router.use("/discount", discountRouter);

module.exports = router;
