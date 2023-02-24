const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  const password = req.body.password;
  try {
    // パスワードの暗号化
    // 第1引数に暗号化したい文字列
    // 第2引数にシークレットキー
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザーの新規作成
    const user = await User.create(req.body);
    // jwtの発行
    // MongoDBに保存されているuserの_idをもとに、jwtを発行する。
    // 第3引数は保存期間。
    // トークンとは証明書
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    // 成功したらuserとtokenの情報をクライアントに返す。
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ユーザーログイン用API
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // DBからユーザーが存在するか探してくる。
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({
        errors: [{
          param: "username",
          msg: "ユーザー名が無効です",
        }],
      });
    }
    // パスワードの照合
    // decryptは暗号化したパスワードを入力したパスワードに戻すことができる。
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [{
          param: "password",
          msg: "パスワードが無効です",
        }],
      });
    }
    // 上記に引っ掛からなければ、jwtの発行
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    // 成功したらuserとtokenの情報をクライアントに返す。
    return res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
