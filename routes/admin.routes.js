const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin, logoutAdmin, refreshAdminToken } = require("../controllers/admin.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const admin_self_police = require("../middlewares/admin_self_police");

const router = require("express").Router();


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/update", adminMiddleware, admin_self_police, updateAdmin);
router.post("/logout", logoutAdmin);
router.delete("/delete", deleteAdmin);
router.delete("/refresh", refreshAdminToken); 


module.exports = router;