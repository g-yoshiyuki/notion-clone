// Routerとは、特定URIにアクセスした際に、どのファイルを実行するかを指定する機能。
const router = require("express").Router();

// auth → auth.js
router.use("/auth", require("./auth"));

module.exports = router;