// Routerとは、HTTPリクエストに対して適切な処理を割り当てる機能を持つもの。
// 特定URIにアクセスした際に、どのファイルを実行するかを指定する機能。
const router = require("express").Router();

// router.use()は、ルーター内でのみ有効なミドルウェアを設定するために使われる。
// router.getの引数で指定されるパスは限定的で、router.useで指定されるパスは以下も含める。

// http://localhost:3020/api/v1/auth以下にアクセスした時に、auth.jsを実行する。
router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));

module.exports = router;

// ※router.useは、Routerオブジェクトに対して全てのルートに対してミドルウェア関数を適用するために使用され、router.getは、GETリクエストに対するルートを定義するために使用される。