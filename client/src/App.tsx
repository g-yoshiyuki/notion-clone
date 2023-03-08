import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Memo from "./pages/Memo";

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
          {/* Routes内の最初にマッチしたRouteにリダイレクトされる。AuthLayoutが先に定義されているため、"/"にアクセスするとAuthLayoutが表示され、その中にあるpath="/login"のRouteがマッチして、自動的に"/login"にリダイレクトされる。 */}
            <Route path="/" element={<AuthLayout />}>
              {/* 子コンポーネントをpathで指定したurlで表示する。 */}
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Route>
            <Route path="/" element={<AppLayout />}>
              {/* indexはルートと同じパス。 */}
              <Route index element={<Home />} />
              <Route path="memo" element={<Home />} />
              {/* : をつけることでパラメーターとして認識されるので動的な値をいれることができる */}
              <Route path="memo/:memoId" element={<Memo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}
export default App;
