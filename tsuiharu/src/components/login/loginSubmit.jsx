import axios from 'axios';


const LoginSubmit = (data, loginApiurl, headers) => {
  console.log("login submit ", data)
  axios.post(
    loginApiurl, data, {
    headers: headers
  })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default LoginSubmit;
