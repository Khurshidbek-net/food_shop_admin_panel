const {
  getAllDiscounts,
  updateDiscountById,
  addDiscount,
  findDiscountById,
  deleteDiscountById,
  getAll
} = require("../controllers/discount.controller");

const router = require("express").Router();

router.get("/", getAll)
router.get("/all", getAllDiscounts);
router.post("/add", addDiscount);
router.post("/update", updateDiscountById);
router.get("/:id", findDiscountById);
router.post("/delete", deleteDiscountById);

module.exports = router;
