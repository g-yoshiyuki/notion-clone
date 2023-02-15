const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // 重複してはだめ
    unique: true,

  },
  password: {
    type: String,
    required: true,
  }
})
// module.exportsはプロパティ名を付与付与せずに値を格納できる。
module.exports = mongoose.model("User",userSchema);