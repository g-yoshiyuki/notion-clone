import zIndex from "@mui/material/styles/zIndex";
import axiosClient from "./axiosClient";
// クライアントからサーバーへAPIリクエストを送る。
// axiosClientに、baseURLとしてサーバーのパスが設定されている。
// 以下のコードの引数は、baseURLの相対パスになる。
// メモに関するAPIをまとめている。
const memoApi = {
  // http://localhost:3020/api/v1/memo
  create: ()=> axiosClient.post("memo"),
  getAll: ()=> axiosClient.get("memo"),
  getOne: (id:string) => axiosClient.get(`memo/${id}`),
  // putは、指定されたURLに対してデータを更新するために使用する。
  update: (id:string,params:any) => axiosClient.put(`memo/${id}`,params),
  delete: (id:string) => axiosClient.delete(`memo/${id}`),
};
export default memoApi;
