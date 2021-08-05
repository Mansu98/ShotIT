const express = require("express");
const products= require("./routes/products");
const auth = require("./routes/auth");
const cookieParser= require("cookie-parser");

const errorMiddleware = require("./middlewares/errors");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", products);
app.use("/api/v1", auth);

// middleware to handle erroes
app.use(errorMiddleware);


module.exports= app;