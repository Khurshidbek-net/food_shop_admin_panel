const router = require("express").Router();
const upload = require("../services/multerService.service");

const {
  addProduct,
  getByQuery,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("../controllers/products.controller");


router.post("/", upload.single("image"), addProduct);

router.get("/query", getByQuery);
router.get("/", getAll);
router.get("/id/:id", getById);
router.put("/update/:id", upload.single("image"), updateById);
router.delete("/delete/:id", deleteById);

module.exports = router;
