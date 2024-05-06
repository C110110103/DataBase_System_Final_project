import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import App from './App.jsx';
import { GlobleVar } from './components/globleVar/GlobleVar.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobleVar>
    <React.StrictMode>
      <CustomProvider theme="dark">
        <App />
      </CustomProvider>
    </React.StrictMode>
  </GlobleVar>
)
