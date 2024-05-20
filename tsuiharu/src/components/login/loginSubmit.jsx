import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


const LoginSubmit = (data, loginApiurl, headers, setResult) => {


  console.log("login submit ", data)
  axios.post(
    loginApiurl, data, {
    headers: headers
  })
    .then((res) => {
      console.log(res.data.user)
      console.log(res.data)

      let userData = {
        token: res.data.token,
        user: res.data.user
      }

      localStorage.setItem("userData", JSON.stringify(userData));


      if (res.data.msg === "Login successful") {
        enqueueSnackbar("登入成功", { variant: 'success' });
      }

      setResult(true)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.data.message === "Password is incorrect") {
        enqueueSnackbar("密碼不正確", { variant: 'error' });
      } else if (err.response.data.message === "This case is not allowed") {
        enqueueSnackbar("信箱或密碼格式不正確", { variant: 'error' });
      } else if (err.response.data.message === "Email is not found") {
        enqueueSnackbar("信箱不存在", { variant: 'error' });
      }
    })
}

export default LoginSubmit;
