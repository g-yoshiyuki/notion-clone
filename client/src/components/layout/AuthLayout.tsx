import { Box, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";
import { useEffect, useState } from "react";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=> {
    // JWTをもっているか確認する
    const checkAuth = async () => {
      // 認証チェック
      //ページ切り替える度に認証チェック(トークン持ってるかどうか確認)
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        // AuthLayoutの下にあるAppLayout が表示される
        navigate("/");
      }
    }
    checkAuth();
  },[navigate])
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          // sxで直接スタイルを定義できる(materialUi)。使い回さないスタイルに有効
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            // styleはReactのstyle属性
            style={{ width: 100, marginBottom: 2 }}
          />
          Notionクローン開発
        </Box>
        {/* 子コンポーネントを表示させるには以下Outletを読み込む */}
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;
