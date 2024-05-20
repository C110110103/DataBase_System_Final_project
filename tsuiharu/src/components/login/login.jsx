import { SnackbarProvider } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import { StoreContext } from '../globleVar/GlobleVar';
// import "../register/register.css";
import loginSubmit from './loginSubmit';



export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [result, setResult] = useState(null);

  const { GloBackEndUrl, Gloheaders } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const headers = Gloheaders;

  const loginApiurl = `${backEndUrl}/users/login`
  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      navigate('/');
    }
  }, [result, navigate]);

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
    loginSubmit(data, loginApiurl, headers, setResult); // 调用 Submit 函数
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
            <h1>登入</h1>
            <form>
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

              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label style={{ textAlign: "left" }} htmlFor="password">密碼</label>
                <input
                  style={{
                    marginTop: '10px',
                    color: "black",
                    textAlign: 'left',
                    border: '1px solid #ccc', // 外框樣式
                    borderRadius: '5px' // 圓角半徑
                  }}
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
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
                  登入
                </Button>
                <Button
                  style={{ marginTop: '10px' }}
                  size='md'
                  color="yellow"
                  appearance="primary"
                  as={Link} to="/register"
                >
                  前往註冊
                </Button>
              </div>

            </form>
          </div>
        </div>
      </SnackbarProvider>
    </>
  )
}