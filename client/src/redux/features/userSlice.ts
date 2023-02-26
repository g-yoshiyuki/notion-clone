import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // action.payloadに渡されたデータをstate.valueに代入して、Reduxストアの状態を更新する。
    // stateには、userSliceの状態が入る。actionには、アクションオブジェクトが入る。
    setUser: (state, action) => {
      // action.payloadは更新された値を取得している。
      state.value = action.payload;
    },
  },
});

// actionsとは、上記reducersのこと。
// コンポーネントからactionをdispatchできるようにexport
export const { setUser } = userSlice.actions;
// storeに登録するためにexport
export default userSlice.reducer;
