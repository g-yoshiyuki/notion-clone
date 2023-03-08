import { Box, IconButton, TextField } from "@mui/material";
// Material-UIのv5以降では、@material-ui/iconsパッケージが廃止されている
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoApi from "../api/memoApi";
import { AxiosResponse } from "axios";
import { setMemo } from "../redux/features/memoSlice";

const Memo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");

  const memos = useSelector((state: any) => state.memo);
  const favoriteMemos = useSelector((state: any) => state.favorites.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res: AxiosResponse = await memoApi.getOne(memoId!);
        setTitle(res.title);
        setDescription(res.description);
        setIsFavorite(res.favorite);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  // 入力ごとにAPIを叩かないように、500sのタイムラグをつくっている。
  let timer:NodeJS.Timeout
  const timeout = 500;
  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // timerにセットされた時間をリセットする。
    // これはタイマー実行中に入力があった場合、時間をリセットすることで無駄なAPIリクエストを送ることを防いでいる。
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    // setTimeout 関数は、指定された時間が経過すると、コールバック関数を実行するためのタイマーIDを返す。
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };
  const updateDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId!);

      // if (isFavorite) {
      //   const newFavoriteMemos = favoriteMemos.filter((e) => e.id !== memoId);
      //   dispatch(setFavoriteList(newFavoriteMemos));
      // }

      const newMemos = await memos.filter((memo:any) => memo._id !== memoId);
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };


  return (
    <>
      <Box
        sx={{
          diplay: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          value={title}
          onChange={updateTitle}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            // マテリアルUIでデフォルトであたっているclassのスタイルを上書きしている
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "unset" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />
        <TextField
          value={description}
          onChange={updateDescription}
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "unset" },
            ".MuiOutlinedInput-root": { fontSize: "0,8rem" },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
