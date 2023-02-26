// Routerとは、特定URIにアクセスした際に、どのファイルを実行するかを指定する機能。
// このファイルにルーティングをまとめている
const router = require("express").Router();

// auth → auth.js
router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));

module.exports = router;

// ※router.useは、Routerオブジェクトに対して全てのルートに対してミドルウェア関数を適用するために使用され、
// router.getは、GETリクエストに対するルートを定義するために使用される。