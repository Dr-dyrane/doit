import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './assets/index.css';

const rootElement = document.getElementById('root');

// Create a root using createRoot
const reactRoot = ReactDOM.createRoot(rootElement);

function Main() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Use .render() on the reactRoot to render the Main component
reactRoot.render(<Main />);