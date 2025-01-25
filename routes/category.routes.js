const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/category.controller");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = require("express").Router();

router.post("/", adminMiddleware, createCategory);
router.get("/all", getAllCategories);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);


module.exports = router;