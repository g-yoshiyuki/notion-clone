const jwt = require("jsonwebtoken");
const User = require("../models/user");
// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  // リクエストヘッダーのauthorizationフィールドの値を格納。
  // authorization: bearer token値 という形になっている。
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    // split関数は文字列を分割して配列化する。
    // 半角スペースで区切って、配列の1を指定することでtoken値を取得できる。
    const bearer = bearerHeader.split(" ")[1];
    try {
      // 暗号化されたtokenをverify関数によってデータ化する。
      const decodeToken = jwt.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodeToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
//JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // そのJWTと一致するユーザーを探す
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    // 新しいユーザーで更新
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
