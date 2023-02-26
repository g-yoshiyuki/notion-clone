import axios from "axios";

// サーバーURL
// server/index.jsで、下記URLで./src/v1/routesにアクセスするように設定している。
const BASE_URL = "http://localhost:3020/api/v1";

// クライアントからサーバーにAPIを叩くaxiosインスタンスを生成。
// 複数のエンドポイントがある時はcreateを複数書くことも可能。
const axiosClient = axios.create({
  // どのエンドポイントを叩くのかを設定
  baseURL: BASE_URL,
});

// ローカルストレージから、tokenというキーの値を取得する。
const getToken = () => localStorage.getItem("token");

// APIを叩く前に前処理を行う
// リクエストが送信される前に割り込み処理（インターセプター）を追加する。
axiosClient.interceptors.request.use(async (config: any) => {
  return {
    // config(設定)に対してheaders情報を入れ込む
    ...config,
    headers: {
      // json形式でやり取りをする
      "Content-Type": "application/json",
      // リクエストヘッダにJWTをつけてサーバーに渡す
      authorization: `Bearer ${getToken()}`,
    },
  };
});
// https://blog.magcho.com/2021/6/axios/

// レスポンスの前処理
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);
export default axiosClient;
