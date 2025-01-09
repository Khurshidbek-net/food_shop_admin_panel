const router = require("express").Router();
const ProductRoute = require("./products.route");

router.use("/product", ProductRoute);

module.exports = router;
