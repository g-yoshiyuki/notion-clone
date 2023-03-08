const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");
const { param } = require("express-validator");
const validation = require("../handlers/validation");

//メモを作成
// router.post()は、HTTP POSTリクエストに応答して、行う処理を記述するため、サーバー側で使用する
// http://localhost:3020/api/v1/memoへのリクエストが行われた場合、/memoをルートパスとしてルーティング処理が行われる。つまり以下"/"は/memoになる。
router.post("/", tokenHandler.verifyToken, memoController.create);
// ログインしているユーザーのメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);
// ログインしているユーザーが投稿したメモをひとつ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);
// ログインしているユーザーが投稿したメモをひとつ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);
// ログインしているユーザーが投稿したメモをひとつ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);


module.exports = router;
// ルーターをエクスポートすることで、このルーターがアプリケーションに組み込まれ、 /memo エンドポイントに対するHTTP POSTリクエストとHTTP GETリクエストが処理されるようになる。