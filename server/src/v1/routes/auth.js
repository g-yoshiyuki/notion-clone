const router = require("express").Router();
const { check,body } = require("express-validator");
const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler")

// ユーザー新規登録API
// "/register" を指定することで、
// Postmanからhttp://localhost:3020/api/v1/auth/registerにアクセスすることで下記APIをテストできる。
router.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("パスワードは6文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("確認用パスワードは6文字以上である必要があります"),
  // クライアントが入力したusernameを引数(value)にとる。
  // findOneはユーザーnameが等しい時にuserを返す。
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーは既に使われています");
      }
    });
  }),
  check('password')
  .custom((value, { req }) => {
    if(req.body.password !== req.body.confirmPassword) {
      throw new Error('パスワード（確認）と一致しません。');
    }
    return true;
  }),

  validation.validate,
  userController.register
);

// ログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("パスワードは6文字以上である必要があります"),
  validation.validate,
  userController.login
);

//JWT認証API
// 引数の1番目、2，3と順番に実行されていく。
// 第2引数のミドルウェアの中で、next()まで行くと、第3引数が実行される。
router.post("/verify-token",tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
