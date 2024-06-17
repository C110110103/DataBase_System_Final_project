import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Col,
  Container,
  Content,
  Divider,
  Footer,
  Header,
  Input,
  Panel,
  Radio,
  RadioGroup,
  Row
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { StoreContext } from '../globleVar/GlobleVar';

function FillForm() {
  const { GloBackEndUrl } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;

  const { FormId } = useParams();
  const navigate = useNavigate();

  const getFormByIdApiurl = `${backEndUrl}/forms/getFormById/${FormId}/`;
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [haveResponse, setHaveResponse] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');


    console.log(userData)
    if (userData === null) {
      setTimeout(() => {
        navigate('/login');
      }, 500);
      return;
    }

    const token = JSON.parse(userData).token;
    const userId = JSON.parse(userData).user.userId;


    if (token && getFormByIdApiurl) {
      axios.get(getFormByIdApiurl + userId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setForm(res.data);
          const initialResponses = {};
          res.data.questions.forEach((question, index) => {
            if (question.questionType === 'single') {
              initialResponses[index] = { optionText: '', optionId: '' };
            } else if (question.questionType === 'multiple') {
              initialResponses[index] = [];
            } else if (question.questionType === 'text') {
              // Assuming there is only one option for text questions
              initialResponses[index] = { optionText: '', optionId: question.options[0].optionId };
            }
          });
          setResponses(initialResponses);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "you have already submitted this form") {
            setHaveResponse(true);
          }
        });
    }
  }, [getFormByIdApiurl, FormId, navigate]);

  const handleResponseChange = (index, value) => {
    const newResponses = { ...responses };
    if (Array.isArray(value)) {
      newResponses[index] = value.map(v => {
        const option = form.questions[index].options.find(o => o.optionText === v);
        return { optionText: v, optionId: option.optionId };
      });
    } else if (typeof value === 'string') {
      const option = form.questions[index].options.find(o => o.optionText === value);
      newResponses[index] = { optionText: value, optionId: option ? option.optionId : responses[index].optionId };
    } else {
      const option = form.questions[index].options.find(o => o.optionText === value);
      newResponses[index] = { optionText: value, optionId: option ? option.optionId : responses[index].optionId };
    }
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = localStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    const userId = JSON.parse(userData).user.userId;
    const submissionTime = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });

    const data = {
      FormId,
      userId,
      responses,
      submissionTime
    };

    console.log(data);

    axios.post(`${backEndUrl}/forms/submitForm`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "submitForm successful") {
          enqueueSnackbar('回答提交成功', { variant: 'success' });
          setTimeout(() => {
            navigate('/home');
          }, 500)
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "you have already submitted this form") {
          enqueueSnackbar('你已經回答過這份問卷', { variant: 'error' });
        } else {
          enqueueSnackbar('因為不明原因回答提交失敗', { variant: 'error' });
        }
      });
  };

  const handleReturnHome = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  if (haveResponse) {
    return (
      <Container>
        <Header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '10px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Button appearance="primary" size='lg' onClick={handleReturnHome}>
            回到首頁
          </Button>
        </Header>
        <div style={{ marginTop: '250px', textAlign: 'center' }}>
          <h2>我們已經有您的回答了，您無法回答同一份問卷兩次</h2>
        </div>
      </Container>
    );
  }

  if (!form) return <div>Loading...</div>;

  return (
    <SnackbarProvider>
      <Container>
        <Header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2>{form.formName}</h2>
          <Button appearance="primary" size='lg' onClick={handleReturnHome}>
            回到首頁
          </Button>
        </Header>

        <Content style={{ marginTop: "3rem", padding: '10rem', paddingTop: "1rem", paddingBottom: "1rem" }}>
          {form.questions.map((question, index) => (
            <Panel bordered key={index} style={{ marginBottom: 20 }}>
              <Row style={{ marginBottom: 10 }}>
                <Col xs={24}>
                  <h4>{`Question ${index + 1}: ${question.questionText}`}</h4>
                </Col>
              </Row>
              {question.questionType === 'single' && (
                <RadioGroup
                  name={`question-${index}`}
                  value={responses[index]?.optionText || ''}
                  onChange={(value) => handleResponseChange(index, value)}
                >
                  {question.options.map((option, oIndex) => (
                    <Radio key={oIndex} value={option.optionText}>
                      {option.optionText}
                    </Radio>
                  ))}
                </RadioGroup>
              )}
              {question.questionType === 'multiple' && (
                <CheckboxGroup
                  name={`question-${index}`}
                  value={responses[index]?.map(response => response.optionText) || []}
                  onChange={(value) => handleResponseChange(index, value)}
                >
                  {question.options.map((option, oIndex) => (
                    <Checkbox key={oIndex} value={option.optionText}>
                      {option.optionText}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
              {question.questionType === 'text' && (
                <Input
                  as="textarea"
                  rows={5}
                  value={responses[index]?.optionText || ''}
                  onChange={(value, event) => handleResponseChange(index, event.target.value)}
                  placeholder="Detailed answer"
                />
              )}
            </Panel>
          ))}
          <Button appearance="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
            提交回答
          </Button>
        </Content>
        <Footer>
          <Divider />
          <p style={{ textAlign: 'center' }}>© 2024 Form Filler</p>
        </Footer>
      </Container>
    </SnackbarProvider>
  );
}

export default FillForm;
