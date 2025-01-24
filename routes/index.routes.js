const router = require("express").Router();


const  categoryRoute = require("./category.routes");
const adminRoute = require("./admin.routes");

router.use("/category", categoryRoute);
router.use("/admin", adminRoute);


module.exports = router;