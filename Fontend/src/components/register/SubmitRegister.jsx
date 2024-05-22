import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const SubmitRegister = (data, RegisterApiurl, headers) => {
  return new Promise((resolve, reject) => {
    axios.post(RegisterApiurl, data, { headers: headers })
      .then((res) => {
        console.log("res:", res.data);
        if (res.data === "Account created successfully and email sent successfully!") {
          enqueueSnackbar("註冊成功，請盡快前往信箱查看密碼", { variant: 'success' });
          resolve(true);
        }
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        if (err.response.data.message === "Username already exists") {
          enqueueSnackbar("用戶已存在", { variant: 'error' });
        } else if (err.response.data.message === "Email already exists") {
          enqueueSnackbar("信箱已存在", { variant: 'error' });
        } else if (err.response.data.message === "This case is not allowed") {
          enqueueSnackbar("username 應該在3-60個字符之間,信箱必須為電子信箱", { variant: 'error' });
        }
        reject(false);
      });
  });
}

export default SubmitRegister;
