import { Plus, Trash } from '@rsuite/icons';
import { useContext, useState } from 'react';
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


  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState([{
    questionText: '',
    questionType: 'single',
    options: ['']
  }]);

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
    console.log('Form created:', formName, questions);
    const data = {
      formName,
      questions
    };
    SubmitForm(token, data, createFormApiurl, headers);
  };

  return (
    <Container>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input
          placeholder="Enter form name"
          value={formName}
          onChange={(value) => setFormName(value)}
          style={{ fontSize: '20px', marginBottom: '20px', width: '95%' }}
        />
        <Button
          style={{
            fontSize: '24px',
            Height: '100%',
            marginBottom: 'auto',
          }}
          appearance="primary"
          size='lg'
          onClick={(e) => handleCreateForm(e)
          }>
          建立表單
        </Button>
      </Header>
      <Content style={{ padding: '10rem', paddingTop: "1rem", paddingBottom: "1rem" }}>
        {questions.map((question, index) => (
          <Panel bordered key={index} style={{ marginBottom: 20 }}>
            <Row style={{ marginBottom: 10 }}>
              <Col xs={20}>
                <Input
                  placeholder={`Question ${index + 1}`}
                  value={question.questionText}
                  onChange={(value) => handleQuestionTextChange(index, value)}
                />
              </Col>
              <Col xs={4} style={{ textAlign: 'right' }}>
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
              <Row>
                {question.options.map((option, oIndex) => (
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
                ))}
                <Button onClick={() => handleAddOption(index)}>Add Option</Button>
              </Row>
            )}
            {question.questionType === 'multiple' && (
              <Row>
                {question.options.map((option, oIndex) => (
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
                ))}
                <Button onClick={() => handleAddOption(index)}>Add Option</Button>
              </Row>
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
  );
}

export default CreateForm;
