import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // stateとは、ストア内の状態。ストアのnameがuserのsliceの値を取得
  const user = useSelector((state: any) => state.user.value);
  const memos = useSelector((state: any) => state.memo);
  // URLのパラメーターを取り出す
  const { memoId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  //読み込み時に自分のメモを全て取得
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        //状態をグローバルに保存
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = memos.findIndex((e: any) => e._id === memoId);
    setActiveIndex(activeItem);
  }, [navigate]);

  const createMemo = async () => {
    try {
      const res = await memoApi.create();
      dispatch(setMemo([res, ...memos]));
      // navigate(`/memo/${res._id}`); //memoに割り振られたidをパスに設定
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: 250,
        height: "100vh",
      }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={() => createMemo()}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item: any, index: number) => (
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                {item.icon} {item.title}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
