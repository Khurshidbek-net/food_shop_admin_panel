const { getAllDiscounts } = require("../controllers/discount.controller");
const { createViewPage } = require("../helpers/create_view_page");
const Categories = require("../models/Categories");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/products", (req, res) => {
  res.render(createViewPage("products"), {
    title: "Products",
    isDict: true,
  });
});

router.get("/add_products", (req, res) => {
  res.render(createViewPage("add_products"), {
    title: "Add Products",
    isDict: true,
  });
});

router.get("/orders", (req, res) => {
  res.render(createViewPage("orders"), {
    title: "Orders",
    isDict: true,
  });
});

router.get("/discounts", getAllDiscounts);

router.get("/add_discount", (req, res) => {
  res.render(createViewPage("add_discount"), {
    title: "Add Discount",
    isDict: true,
  });
});

router.get("/users", (req, res) => {
  res.render(createViewPage("users"), {
    title: "User",
    isDict: true,
  });
});

router.get("/profile", (req, res) => {
  res.render(createViewPage("profile"), {
    title: "Profile",
    isDict: true,
  });
});

router.get("/tasks", (req, res) => {
  res.render(createViewPage("tasks"), {
    title: "Tasks",
    isDict: true,
  });
});

router.get("/categories", async (req, res) => {
  const result = await Categories.find();
  res.render(createViewPage("categories", {result}), {
    title: "Categories",
    isDict: true
  });
});

router.get("/add_category", (req, res) => {
  res.render(createViewPage("add_category"), {
    title: "AddCategories",
    isDict: true
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login",
    isDict: true
  });
});

router.get("/register", (req, res) => {
  res.render(createViewPage("register"), {
    title: "Register",
    isDict: true
  });
});

module.exports = router;
