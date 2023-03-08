import axiosClient from "./axiosClient";
// クライアントからサーバーに向けた、
// 認証に関するAPIをまとめている。
const authApi = {
  // server/index.jsでrouterの設定をしている。./src/v1/routesを参照するように設定している
  // auth/でauth.jsにアクセスするようにrouters/index.jsに設定している。
  // axiosClientはaxiosClient.tsでAPIを叩く前の下処理を実装している
  register: (params: any) => axiosClient.post("auth/register", params),
  login: (params: any) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};
export default authApi;
