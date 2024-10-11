require("dotenv").config(); // 加载环境变量
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors'); // Import the cors package


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const tiretypeRoutes = require("./routes/tiretypes"); // Add this line to import the new router
const orderRoutes = require("./routes/orders");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // Enable CORS for all routes

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/tiretypes", tiretypeRoutes); // Add this line to use the new router
app.use("/orders", orderRoutes);

module.exports = app;
