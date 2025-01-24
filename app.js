const express = require('express');
const config = require('config');
const exHbs = require("express-handlebars");
const viewRouter = require("./routes/view.routes");
<<<<<<< HEAD
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const mainRoute = require("./routes/index.routes");
=======
const MainRout = require("./routes/index")
>>>>>>> 6d5657b68558733f4963c303b8b8538cc2613eab


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


<<<<<<< HEAD
app.use("/", viewRouter); 
app.use("/api", mainRoute);
=======
app.use("/", viewRouter);  
app.use("/api", MainRout); 
>>>>>>> 6d5657b68558733f4963c303b8b8538cc2613eab


async function start() {
  try {
<<<<<<< HEAD
    await mongoose.connect(config.get("db_url"));
    console.log("Db Connected");
=======
    
>>>>>>> 6d5657b68558733f4963c303b8b8538cc2613eab
    app.listen(port, () => {
      console.log(`Server running: http://localhost:${port}`)
    });
  } catch (error) {
    console.log(error);
  }
}

start();




