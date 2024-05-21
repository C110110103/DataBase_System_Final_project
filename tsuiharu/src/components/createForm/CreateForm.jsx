import { Plus, Trash } from '@rsuite/icons';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Content,
  Divider,
  Footer,
  Header,
  IconButton,
  Input,
  Panel,
  Row,
  SelectPicker
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { StoreContext } from '../globleVar/GlobleVar';
import SubmitForm from './submitForm';


const questionTypes = [
  { label: 'Single Choice', value: 'single' },
  { label: 'Multiple Choice', value: 'multiple' },
  { label: 'Text', value: 'text' }
];

function CreateForm() {
  const { GloBackEndUrl, Gloheaders } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const headers = Gloheaders;

  const createFormApiurl = `${backEndUrl}/forms/createForm`;
  const userData = localStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  const userId = JSON.parse(userData).user.userId;
  const [result, setResult] = useState(null);
  const navigate = useNavigate();


  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState([{
    questionText: '',
    questionType: 'single',
    options: ['']
  }]);


  useEffect(() => {
    if (result) {
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }
  }, [result, navigate]);


  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'single', options: [''] }]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionTextChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionType = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, index) => index !== oIndex);
    setQuestions(newQuestions);
  };

  const handleCreateForm = (e) => {
    e.preventDefault();

    // 獲取台灣時間
    const taiwanTime = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });

    console.log('Form created:', formName, questions, taiwanTime);

    if (!formName) {
      enqueueSnackbar("不允許formName為空", { variant: 'error' });
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText) {
        enqueueSnackbar(`問題${i + 1}不允許為空`, { variant: 'error' });
        return;
      }

      if (questions[i].questionType === 'single' || questions[i].questionType === 'multiple') {
        for (let j = 0; j < questions[i].options.length; j++) {
          if (!questions[i].options[j]) {
            enqueueSnackbar(`問題${i + 1}的選項${j + 1}不允許為空`, { variant: 'error' });
            return;
          }
        }
      }
    }
    const data = {
      formName,
      questions,
      createdTime: taiwanTime,
      creatorId: userId
    };
    SubmitForm(token, data, createFormApiurl, headers, setResult);
  };

  const handleReturnHome = (e) => {
    e.preventDefault();
    navigate('/home');
  }


  return (
    <SnackbarProvider>
      <Container>
        <Header style={{
          position: 'fixed',  // Fix the position
          top: 0,
          left: 0,
          width: '100%',  // Ensure it spans the full width
          zIndex: 1000,  // Ensure it is above other content
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ width: "10%", marginBottom: '20px' }}>
            <h4>表單名稱 : </h4>
          </div>
          <Input
            placeholder="Enter form name"
            value={formName}
            onChange={(value) => setFormName(value)}
            style={{ fontSize: '20px', marginBottom: '20px', width: '80%' }}
          />

          <Button
            style={{
              fontSize: '24px',
              height: '100%',
              marginBottom: 'auto',
              marginRight: '1rem',
              marginLeft: '1rem',
            }}
            appearance="primary"
            size='lg'
            onClick={(e) => handleReturnHome(e)}
          >
            回到首頁
          </Button>
          <Button
            style={{
              fontSize: '24px',
              height: '100%',  // Changed 'Height' to 'height'
              marginBottom: 'auto',
            }}
            appearance="primary"
            size='lg'
            onClick={(e) => handleCreateForm(e)}
          >
            建立表單
          </Button>
        </Header>

        <Content style={{ marginTop: "3rem", padding: '10rem', paddingTop: "1rem", paddingBottom: "1rem" }}>
          {questions.map((question, index) => (
            <Panel bordered key={index} style={{ marginBottom: 20 }}>
              <Row style={{ marginBottom: 10 }}>
                <Col xs={24}>
                  <h4>Question {index + 1}</h4>
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col xs={22}>
                  <Input
                    placeholder={`Question ${index + 1}`}
                    value={question.questionText}
                    onChange={(value) => handleQuestionTextChange(index, value)}
                  />
                </Col>
                <Col xs={2} style={{ textAlign: 'right' }}>
                  <IconButton
                    icon={<Trash />}
                    color="red"
                    onClick={() => handleDeleteQuestion(index)}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col xs={24}>
                  <SelectPicker
                    data={questionTypes}
                    value={question.questionType}
                    onChange={(value) => handleQuestionTypeChange(index, value)}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              {question.questionType === 'single' && (
                <div>
                  {
                    question.options.map((option, oIndex) => (
                      <div key={oIndex}>
                        <Row style={{ marginLeft: 2, marginBottom: 5 }}>
                          <h4>Option {oIndex + 1}</h4>
                        </Row>

                        <Row>
                          <Col xs={24} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <Input
                              placeholder={`Option ${oIndex + 1}`}
                              value={option}
                              onChange={(value) => handleOptionChange(index, oIndex, value)}
                              style={{ marginRight: 10 }}
                            />
                            <IconButton
                              icon={<Trash />}
                              color="red"
                              onClick={() => handleDeleteOption(index, oIndex)}
                            />
                          </Col>
                        </Row>
                      </div>
                    ))
                  }
                  <Button onClick={() => handleAddOption(index)}>Add Option</Button>
                </div>
              )}
              {question.questionType === 'multiple' && (
                <div>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex}>
                      <Row style={{ marginLeft: 2, marginBottom: 5 }}>
                        <h4>Option {oIndex + 1}</h4>
                      </Row>
                      <Row>
                        <Col xs={24} key={oIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                          <Input
                            placeholder={`Option ${oIndex + 1}`}
                            value={option}
                            onChange={(value) => handleOptionChange(index, oIndex, value)}
                            style={{ marginRight: 10 }}
                          />
                          <IconButton
                            icon={<Trash />}
                            color="red"
                            onClick={() => handleDeleteOption(index, oIndex)}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Button onClick={() => handleAddOption(index)}>Add Option</Button>
                </div>
              )}
              {question.questionType === 'text' && (
                <Row>
                  <Col xs={24}>
                    <Input as="textarea" rows={5} placeholder="Detailed answer" disabled />
                  </Col>
                </Row>
              )}
            </Panel>
          ))}
          <Button appearance="primary" onClick={handleAddQuestion} style={{ marginTop: 20 }}>
            <Plus /> Add Question
          </Button>
        </Content>
        <Footer>
          <Divider />
          <p style={{ textAlign: 'center' }}>© 2024 Form Builder</p>
        </Footer>
      </Container>
    </SnackbarProvider >
  );
}

export default CreateForm;
