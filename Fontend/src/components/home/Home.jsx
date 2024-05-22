import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Content,
  Header,
  List,
  Nav,
  Navbar,
  Panel,
  Row,
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { StoreContext } from '../globleVar/GlobleVar';

export default function Home() {
  const { GloBackEndUrl, GloFontEndUrl } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const fontEndUrl = GloFontEndUrl;

  const userData = localStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  const creatorId = JSON.parse(userData).user.userId;
  const createFormApiurl = `${backEndUrl}/forms/getForm/${creatorId}`;
  const [updateForm, setUpdateForm] = useState(false);


  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && createFormApiurl || updateForm === true) {
      axios.get(createFormApiurl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setForms(res.data);
          setUpdateForm(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, createFormApiurl, navigate, updateForm]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleModifyForm = (formId) => {
    navigate(`/modifyForm/${formId}`);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  }

  const handledDeleteForm = (formId) => {
    const deleteFormApiurl = `${backEndUrl}/forms/deleteForm/${formId}`;
    axios.delete(deleteFormApiurl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "deleteForm successful") {
          setUpdateForm(true);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  const handledCopyForm = (formId) => {
    const copyFormApiurl = `${fontEndUrl}/FillOutForm/${formId}`;
    navigator.clipboard.writeText(copyFormApiurl)
      .then(() => {
        enqueueSnackbar("成功複製指令", {
          variant: "success",
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        });
      })
      .catch(() => {
        enqueueSnackbar("複製指令失敗", {
          variant: "error",
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        });
      });
  }

  return (
    <SnackbarProvider>
      <Container>
        <Header>
          <Navbar appearance="inverse">
            <Navbar.Brand href="#">Form Builder</Navbar.Brand>

            <Nav>
              <Nav.Item>
                <Button
                  color="orange"
                  appearance="primary"
                  onClick={() => navigate('/createForm')}
                >
                  CreateForm
                </Button>
              </Nav.Item>
            </Nav>
            <Nav pullRight>
              {!token ? (
                <>
                  <Nav.Item>
                    <Button
                      appearance="primary"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button
                      appearance="primary"
                      onClick={() => navigate('/register')}
                    >
                      Sign Up
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item>
                  <Button
                    appearance="primary"
                    onClick={(e) => handleLogout(e)}
                  >
                    logout
                  </Button>
                </Nav.Item>
              )
              }
            </Nav>
          </Navbar>
        </Header>
        <Content style={{ padding: '2rem' }}>
          <h1>你的表單</h1>
          <List>
            {forms.map((form) => (
              <List.Item key={form.formId}>
                <Panel bordered header={form.formName}>

                  <Row style={{ marginBottom: "0rem" }}>
                    <Col xs={18}>
                      <p>Form ID: {form.formId}</p>
                      <p>Created At: {form.createdTime}</p>
                    </Col>
                    <Col xs={2} >
                      <Button appearance="primary" onClick={() => handleModifyForm(form.formId)}>
                        修改表單
                      </Button>
                    </Col>
                    <Col xs={2} >
                      <Button appearance="primary" color="red" onClick={() => handledDeleteForm(form.formId)}>
                        刪除表單
                      </Button>
                    </Col>
                    <Col xs={2} >
                      <Button appearance="primary" onClick={() => handledCopyForm(form.formId)}>
                        複製表單
                      </Button>
                    </Col>
                  </Row>
                </Panel>
              </List.Item>
            ))}
          </List>
        </Content>
      </Container>
    </SnackbarProvider>
  );
}
