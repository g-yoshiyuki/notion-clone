const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3020;
require("dotenv").config();

// getメソッドを受信した時
// app.get("/", (req, res) => {
//   res.send("Hellow Express");
// });
// app.listen(PORT, () => {
//   console.log("ローカルサーバー起動中...");
// });

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中...")
} catch (error) {
  console.log(error);
}
