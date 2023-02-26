const mongoose = require("mongoose");

// ※スキーマ → どのようなデータを格納するのかの定義
const memoSchema = new mongoose.Schema({
  user: {
    // Userスキーマと連携させる
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "ここに自由に記入してください",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
})
// module.exportsはプロパティ名を付与付与せずに値を格納できる。
module.exports = mongoose.model("Memo",memoSchema);