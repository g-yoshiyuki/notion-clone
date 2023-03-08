import authApi from "../api/authApi";

const authUtils = {
  //トークンチェック
  isAuthenticated: async () => {
    // ブラウザに保存された "token" という名前のデータを取得
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
