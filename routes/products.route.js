const {
  addProduct,
  getByQuery,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("../controllers/products.controller");

const router = require("express").Router();

router.post("/", addProduct);
router.get("/query", getByQuery);
router.get("/", getAll);
router.get("/id/:id", getById);
router.put("/update/:id", updateById);
router.delete("/delete/:id", deleteById);

module.exports = router;
