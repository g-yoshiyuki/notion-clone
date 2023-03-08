import { AxiosResponse } from "axios";
// .d.ts拡張子を持つファイルは自動的に型定義ファイルとして認識されるため、
// 型を使用するファイルでimport文を追加する必要はない。
// tsconfig.jsonのincludeフィールドに、パスを指定しておく必要がある。

// declare moduleは、TypeScriptで既に存在するモジュールを拡張するために使用される。
declare module "axios" {
  export interface AxiosResponse<T = any, D = any> {
    token?: any;
    user?: any;
    _id?: any;
    title?: any;
    description?: any;
    favorite?: any;
    icon?: any;
  }
}
