import axios from 'axios';


const Submit = (data, RegisterApiurl, headers) => {
  // console.log(data)
  axios.post(
    RegisterApiurl, data, {
    headers: headers
  })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default Submit;
