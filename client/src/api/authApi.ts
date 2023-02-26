import axiosClient from "./axiosClient";
// クライアントからサーバーに向けた、
// 認証に関するAPIをまとめている。
const authApi = {
  // auth/でauth.jsにアクセスするようにrouters/index.jsに設定している。
  register: (params: any) => axiosClient.post("auth/register", params),
  login: (params: any) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};
export default authApi;
