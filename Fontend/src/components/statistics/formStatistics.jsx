import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Content,
  Divider,
  Footer,
  Header,
  Panel,
  Row,
  Table
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { StoreContext } from '../globleVar/GlobleVar';

const { Column, HeaderCell, Cell } = Table;

function StatisticsPage() {
  const { FormId } = useParams();
  const { GloBackEndUrl } = useContext(StoreContext);
  const backEndUrl = GloBackEndUrl;
  const userData = localStorage.getItem('userData');
  const token = JSON.parse(userData).token;

  const getStasticalDataApiurl = `${backEndUrl}/forms/getFormstatisticalData/${FormId}`;

  const navigate = useNavigate();
  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (token && getStasticalDataApiurl) {
      axios.get(getStasticalDataApiurl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
        .then((res) => {
          console.log(res.data.returnData);
          setFormName(res.data.returnData.formName);
          setQuestions(res.data.returnData.questions);
          setResponses(res.data.returnData.responses);
          console.log(res.data.returnData.responses)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [token, getStasticalDataApiurl]);

  const handleReturnHome = (e) => {
    e.preventDefault();
    navigate('/home');
  };

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
          <div style={{ width: "80%", marginBottom: '10px' }}>
            <h4>表單名稱 : {formName} </h4>
          </div>
          <Button
            style={{
              fontSize: '24px',
              height: '100%',
              marginBottom: 'auto',
              marginLeft: '1rem',
            }}
            appearance="primary"
            size='lg'
            onClick={(e) => handleReturnHome(e)}
          >
            回到首頁
          </Button>
        </Header>

        <Content style={{ marginTop: "3rem", padding: '10rem', paddingTop: "1rem", paddingBottom: "1rem" }}>
          {questions.map((question, qIndex) => (
            <Panel bordered key={qIndex} style={{ marginBottom: 20 }}>
              <Row style={{ marginBottom: 10 }}>
                <Col xs={24}>
                  <h4>{question.questionText}</h4>
                </Col>
              </Row>
              {question.questionType !== 'text' && (
                <Table
                  height={question.options.length * 70}
                  data={question.options.map(option => {
                    const count = responses.flat().filter(response => response.optionId === option.optionId).length;
                    return { optionText: option.optionText, count };
                  })}
                >
                  <Column flexGrow={1} align="center">
                    <HeaderCell>Option</HeaderCell>
                    <Cell dataKey="optionText" />
                  </Column>
                  <Column flexGrow={1} align="center">
                    <HeaderCell>Count</HeaderCell>
                    <Cell dataKey="count" />
                  </Column>
                </Table>
              )}
              {question.questionType === 'text' && (
                <div>
                  {responses.flat().filter(response => response.optionId === question.options[0].optionId).map((response, rIndex) => (
                    <Panel key={rIndex} bordered style={{ marginBottom: 10 }}>
                      {response.optionText}
                    </Panel>
                  ))}
                </div>
              )}
            </Panel>
          ))}
        </Content>
        <Footer>
          <Divider />
          <p style={{ textAlign: 'center' }}>© 2024 Form Builder</p>
        </Footer>
      </Container>
    </SnackbarProvider>
  );
}

export default StatisticsPage;
