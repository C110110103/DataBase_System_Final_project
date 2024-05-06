import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GlobleVar } from './components/globleVar/GlobleVar.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobleVar>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobleVar>
)
