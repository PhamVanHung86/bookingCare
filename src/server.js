import express from "express";
// lấy các tham số phía cline sử dụng
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
import connectDB from "./config/connectDB";
//import cors from "cors";
require("dotenv").config();

let app = express();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//app.use(cors({ origin: true }));

// config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRouter(app);

// connectDB
connectDB();

// run app
let port = process.env.PORT;
app.listen(port, () => {
  console.log("Backend Nodejs is runing on the port: " + port);
});
