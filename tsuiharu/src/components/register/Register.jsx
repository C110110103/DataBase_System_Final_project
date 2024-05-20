import { SnackbarProvider } from 'notistack';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import { StoreContext } from '../globleVar/GlobleVar';
import SubmitRegister from './SubmitRegister';
// import "./register.css";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: ""
  })

  const { GloBackEndUrl, Gloheaders } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const headers = Gloheaders;

  const RegisterApiurl = `${backEndUrl}/users/register`

  const navigate = useNavigate();

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止默认提交行为
    let state = SubmitRegister(data, RegisterApiurl, headers); // 调用 Submit 函数
    console.log("state", state);
    if (state) {
      navigate('/login');
    }
  }

  return (
    <>
      <SnackbarProvider>
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
              padding: "100px",
              color: "white",
              width: "20%",
            }}
          >
            <h1>註冊</h1>
            <form>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label style={{ textAlign: "left" }} htmlFor="username">姓名</label>
                <input
                  style={{
                    marginTop: '10px',
                    color: "black",
                    textAlign: 'left',
                    border: '1px solid #ccc', // 外框樣式
                    borderRadius: '5px' // 圓角半徑
                  }}
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
                  style={{
                    marginTop: '10px',
                    color: "black",
                    textAlign: 'left',
                    border: '1px solid #ccc', // 外框樣式
                    borderRadius: '5px' // 圓角半徑
                  }}
                  type="text"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={changeData}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  style={{ marginTop: '10px' }}
                  size='md'
                  color="yellow"
                  appearance="primary"
                  onClick={e => handleSubmit(e)}
                >
                  註冊
                </Button>
                <Button
                  style={{ marginTop: '10px' }}
                  size='md'
                  color="yellow"
                  appearance="primary"
                  as={Link} to="/login"
                >
                  前往登入
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SnackbarProvider>
    </>
  )
}
