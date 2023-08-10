import express from "express";
// lấy các tham số phía cline sử dụng
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
require('dotenv').config();

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);

// run app
let port = process.env.PORT;
app.listen(port, () => {
  console.log("Backend Nodejs is runing on the port: " + port);
});
