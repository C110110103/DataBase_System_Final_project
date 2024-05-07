import { useContext, useState } from 'react';
import { Button } from 'rsuite';
import { StoreContext } from '../globleVar/GlobleVar';
import "../register/register.css";
import loginSubmit from './loginSubmit';


export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const { GloBackEndUrl, Gloheaders } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const headers = Gloheaders;

  const loginApiurl = `${backEndUrl}/users/login`

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(e.target.name, e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止默认提交行为
    console.log("提交")
    loginSubmit(data, loginApiurl, headers); // 调用 Submit 函数
  }


  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
        textAlign: 'center',
      }}>
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "60px",
            color: "white"
          }}
        >
          <h1>登入</h1>
          <form>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label style={{ textAlign: "left" }} htmlFor="email">信箱</label>
              <input
                style={{ marginTop: '10px', color: "black" }} // 將此處的 textAlign 設置為 'left'
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={changeData}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label style={{ textAlign: "left" }} htmlFor="password">密碼</label>
              <input
                style={{ marginTop: '10px', color: "black" }} // 將此處的 textAlign 設置為 'left'
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={changeData}
              />
            </div>
            <Button
              style={{ marginTop: '10px' }}
              size='md'
              color="yellow"
              appearance="primary"
              onClick={e => handleSubmit(e)}
            >
              登入
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}