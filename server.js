const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");

app.use(cors());

//database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Database is connected !");
});
app.use(express.static("public"));
app.use(express.json());

const productRoutes = require("./api/routes/products");
app.use("/products", productRoutes);

const orderRoutes = require("./api/routes/order");
app.use("/order", orderRoutes);

const userRoutes = require("./api/routes/user");
app.use("/user", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
