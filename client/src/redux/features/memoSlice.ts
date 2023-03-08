import { createSlice } from "@reduxjs/toolkit";

// const initialState = { value: [] };のように指定するとsetMemoを実行した時にオブジェクトに変換され、map関数の記述箇所でエラーを起こす
const initialState:Array<any> =  [] ;

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    // action.payloadに渡されたデータをstate.valueに代入して、Reduxストアの状態を更新する。
    // stateには、userSliceの状態が入る。actionには、アクションオブジェクトが入る。
    // 現在のstateを受け取り、新しいstateを返す関数。
    setMemo: (state, action) => {
      // 以下の書き方は非推奨。
      // stateを直接更新すると、前回のstateが破壊され、Reduxが状態変更を検知できなくなる可能性がある。
      // state = action.payload;
      
      return action.payload;
    },
  },
});

// actionsとは、上記reducersのこと。
// コンポーネントからactionをdispatchできるようにexport
export const { setMemo } = memoSlice.actions;
// storeに登録するためにexport
export default memoSlice.reducer;
