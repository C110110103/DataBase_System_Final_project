import axios from "axios";
import { enqueueSnackbar } from "notistack";

export default function SubmitForm(token, data, createFormApiurl, headers, setResult) {
  console.log("data:", data);
  console.log("headers:", headers);
  console.log("token:", token);

  axios.post(createFormApiurl, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }).then(res => {
    console.log("res:", res.data);
    if (res.data.message === "createForm successful") {
      setResult(true);
      enqueueSnackbar("表單創建成功", {
        variant: 'success'
      });
    }
  }).catch(err => {
    console.log("err", err);
    enqueueSnackbar("表單創建失敗", {
      variant: 'error'
    });
  });
}