const express = require("express");
const mongoose = require("mongoose");
//アプリケーションオブジェクトの作成
const app = express();
const PORT = 3020;
require("dotenv").config();
const cors = require("cors");

// app.useはアプリケーション全体に影響するミドルウェアを設定するために使われる。
// (すべてのルートで実行される。引数のパスとマッチするパスで実行する)
// app.getの引数で指定されるパスは限定的で、app.useで指定されるパスは以下も含める。
// ミドルウェアとはリクエストに対して何らかの処理を行う関数のこと。

// ポート番号3000と3020間の通信を有効にする。
// 以下originを許可する。
app.use(cors({
  origin: "http://localhost:3000",
}))
// 以下を記述することでjson形式を認識できるようになる。
app.use(express.json());

// app.use()は指定されたパス以下の全てのリクエストに対してミドルウェア関数を実行する。
// http://localhost:3020/api/v1/以下の全てのリクエストに対してrequireする。(/api/vi/memoなど)
// app.useによって設定されたパスは、アプリケーション全体のルートパスとして機能する。
app.use("/api/v1", require("./src/v1/routes"));

// getはパラメーターがurlに含まれる
// postはパラメーターがリクエストボディに含まれる

// getメソッドを受信した時
// パスを限定してミドルウェアを適用
app.get("/", (req, res) => {
  res.send("Hellow Express");
});
// 第1引数にポート番号、第2引数にサーバー起動時に実行するコールバック関数を指定。
// listenを使うと指定されたポート番号で待ち受け状態になり、クライアントからのリクエストを受け取ることができるようになる
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

