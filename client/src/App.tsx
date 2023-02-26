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

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              {/* 子コンポーネントをpathで指定したurlで表示する。 */}
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Route>
            <Route path="/" element={<AppLayout />}>
              {/* indexはルートと同じパス。 */}
              <Route index element={<Home />} />
              <Route path="memo" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}
export default App;
