import { Box, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";
import { useEffect, useState } from "react";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

const AppLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // JWTをもっているか確認する
    const checkAuth = async () => {
      //ページ切り替える度に認証チェック(トークン持ってるかどうか確認)
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      }else {
        // ユーザーを保存する
        // dispatchすることで初めて値が更新される
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
