const { createViewPage } = require("../helpers/create_view_page");

const router = require("express").Router();


router.get("/", (req, res) =>{
  res.render(createViewPage("index"),{
    title: "Asosiy sahifa",
    isHome: true
  })
});

router.get("/products", (req, res) => {
  res.render(createViewPage("products"), {
    title: "Products",
    isDict: true
  });
});

router.get("/add_products", (req, res) => {
  res.render(createViewPage("add_products"), {
    title: "Add Products",
    isDict: true
  });
});

router.get("/orders", (req, res) => {
  res.render(createViewPage("orders"), {
    title: "Orders",
    isDict: true
  });
});

router.get("/discounts", (req, res) => {
  res.render(createViewPage("discounts"), {
    title: "Discounts",
    isDict: true
  });
});

router.get("/add_discount", (req, res) => {
  res.render(createViewPage("add_discount"), {
    title: "Add Discount",
    isDict: true
  });
});

router.get("/users", (req, res) => {
  res.render(createViewPage("users"), {
    title: "User",
    isDict: true
  });
});

router.get("/profile", (req, res) => {
  res.render(createViewPage("profile"), {
    title: "Profile",
    isDict: true
  });
});

router.get("/tasks", (req, res) => {
  res.render(createViewPage("tasks"), {
    title: "Tasks",
    isDict: true
  });
});

router.get("/allOrderDetails", (req, res) => {
  res.render(createViewPage("orderDetails"), {
    title: "OrderDetail",
    isDict: true
  });
});

router.get("/addOrderDetail", (req, res) => {
  res.render(createViewPage("addOrderDetail"), {
    title: "AddOrderDetail",
    isDict: true
  });
});

module.exports = router;
