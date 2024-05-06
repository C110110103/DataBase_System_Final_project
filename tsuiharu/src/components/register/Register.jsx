import { useContext, useState } from 'react';
import { Button } from 'rsuite';
import { StoreContext } from '../globleVar/GlobleVar';
import Submit from './Submit';
import "./register.css";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: ""
  })

  const { GloBackEndUrl, Gloheaders } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const headers = Gloheaders;

  const RegisterApiurl = `${backEndUrl}/users/register`

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止默认提交行为
    Submit(data, RegisterApiurl, headers); // 调用 Submit 函数
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
          <h1>註冊</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label style={{ textAlign: "left" }} htmlFor="username">姓名</label>
              <input
                style={{ marginTop: '10px' }} // 將此處的 textAlign 設置為 'left'
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={changeData}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label style={{ textAlign: "left" }} htmlFor="email">信箱</label>
              <input
                style={{ marginTop: '10px' }} // 將此處的 textAlign 設置為 'left'
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={changeData}
              />
            </div>
            <Button
              size='lg'
              color="yellow"
              appearance="primary"
            >
              註冊
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
