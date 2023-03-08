import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");


    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // trimで空白を削除する。
    // toStringを使用しないとFormDataEntryValue型となり、trim()できない。
    const username = data.get("username")?.toString().trim();
    const password = data.get("password")?.toString().trim();

    if (username === "") {
      setUsernameErrText("名前を入力してください。");
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください。");
    }
    setLoading(true);
    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password
      });
      localStorage.setItem("token", res.token);
      setLoading(false);
      alert("ログインに成功しました");
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
      });
      setLoading(false);
    }
  };


  return (
    <>
      {/* noValidateはデフォルトのバリデートを非表示にする。 */}
      <Box component="form" noValidate onSubmit={handleLoginSubmit}>
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
          disabled={loading}
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  )
}

export default Login