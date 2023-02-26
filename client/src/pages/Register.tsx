import { Box, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link,useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");


    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // trimで空白を削除する。
    // toStringを使用しないとFormDataEntryValue型となり、trim()できない。
    const username = data.get("username")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    const confirmPassword = data.get("confirmPassword")?.toString().trim();

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください。");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください。");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("確認用パスワードを入力してください。");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります。");
    }
    setLoading(true);
    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", res.token);
      console.log(res.token);
      setLoading(false);
      alert("新規登録に成功しました");
      navigate("/");
    } catch (err: any) {
      console.log(err);
      const errors = err.data.errors;
      errors.forEach((err: any) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.param === "confirmPassword") {
          setConfirmPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      {/* noValidateはデフォルトのバリデートを非表示にする。 */}
      <Box component="form" noValidate onSubmit={handleRegisterSubmit}>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          // エラー時に赤くなる
          error={usernameErrText !== ""}
          // エラー時に設定したテキストが挿入される
          helperText={usernameErrText}
          // ローディング中は押せないように。
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          error={passwordErrText !== ""}
          helperText={passwordErrText}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
          disabled={loading}
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すてにアカウントをもっていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
