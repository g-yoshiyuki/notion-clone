const express = require("express");
const mongoose = require("mongoose");
//アプリケーションオブジェクトの作成
const app = express();
const PORT = 3020;
require("dotenv").config();
const cors = require("cors");

// ポート番号3000と3020間の通信を有効にする。
// 以下originを許可する。
app.use(cors({
  origin: "http://localhost:3000",
}))
// 以下を記述することでjson形式を認識できるようになる。
app.use(express.json());
// http://localhost:3020/api/v1でrequireしたパスにアクセスできる。
app.use("/api/v1", require("./src/v1/routes"));

// getはパラメーターがurlに含まれる
// postはパラメーターがリクエストボディに含まれる

// getメソッドを受信した時
// パスを限定してミドルウェアを適用
app.get("/", (req, res) => {
  res.send("Hellow Express");
});
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中...");
} catch (error) {
  console.log(error);
}

