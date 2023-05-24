import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      style={{
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridGap: `16px`,
        paddingBottom: `24px`,
      }}
    />
  </React.StrictMode>
);
