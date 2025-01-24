const express = require('express');
const config = require('config');
const exHbs = require("express-handlebars");
const viewRouter = require("./routes/view.routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const mainRoute = require("./routes/index.routes");


const port = config.get("port");

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs" // handlebars ni qisqa yozilishi
});


const app = express();
app.use(express.json());
app.use(cookieParser());


app.engine("hbs", hbs.engine);
app.set("view engine", "hbs")
app.set("views", "./views")
app.use(express.static("public"));


app.use("/", viewRouter); 
app.use("/api", mainRoute);


async function start() {
  try {
    await mongoose.connect(config.get("db_url"));
    console.log("Db Connected");
    app.listen(port, () => {
      console.log(`Server running: http://localhost:${port}`)
    });
  } catch (error) {
    console.log(error);
  }
}

start();




