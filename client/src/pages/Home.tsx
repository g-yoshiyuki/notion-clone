import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi";
import { setMemo } from "../redux/features/memoSlice";
// import { setMemo } from "../redux/features/memoSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //メモの作成
  const createMemo = async () => {
    setLoading(true);
    try {
      const res = await memoApi.create();
      setLoading(false);
      // 下記コードはmemoSliceの値を上書きする。追加したい場合はスプレッド構文を使用する
      dispatch(setMemo([res]));
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        // color="success"
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;