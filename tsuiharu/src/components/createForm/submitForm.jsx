import axios from "axios";

export default function SubmitForm(token, data, createFormApiurl, headers) {
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
  }).catch(err => {
    console.log("err", err);
  });
}