import axios from 'axios';
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
  const { GloBackEndUrl } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;

  const userData = localStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  const creatorId = JSON.parse(userData).user.userId;
  const createFormApiurl = `${backEndUrl}/forms/getForm/${creatorId}`;

  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && createFormApiurl) {
      axios.get(createFormApiurl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setForms(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, createFormApiurl, navigate]);

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

  return (
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
                <p>Form ID: {form.formId}</p>
                <p>Created At: {form.createdTime}</p>
                <Row>
                  <Col xs={18}></Col>
                  <Col xs={6} style={{ textAlign: 'right' }}>
                    <Button appearance="primary" onClick={() => handleModifyForm(form.formId)}>
                      修改表單
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </List.Item>
          ))}
        </List>
      </Content>
    </Container>
  );
}
