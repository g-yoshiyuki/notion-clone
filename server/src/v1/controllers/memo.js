const Memo = require("../models/memo");
// const Section = require("../models/section");
// const Task = require("../models/task");

exports.create = async (req, res) => {
  try {
    // MongoDBデータベース内のMemoコレクション内の全てのドキュメントを取得し、
    // その数を返すコマンド
    const memoCount = await Memo.find().count();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch {
    res.status(500).json(err);
  }
};
exports.getAll = async (req, res) => {
  try {
    //今ログインしているユーザーIDから、それに紐づいたメモを全て取り出してる。
    // .sort箇所の記述はMongoDBの書き方。降順にソート
    const memo = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memo);
  } catch {
    res.status(500).json(err);
  }
};
exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入してください";

    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    // マングースの記法
    // memoIdを更新する。$setは色々なプロパティを含める。
    const updatedMemo = await Memo.findByIdAndUpdate(memoId,{
      $set:req.body,
    })
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.delete = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    await Memo.deleteOne({_id: memoId})
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};


