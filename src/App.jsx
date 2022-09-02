import React from 'react';
import Form from './components/Form';
import register from './api/registerExemptionRequests';
import './App.css';

function App() {
  const registerFunction = async (payload) => {
    await register(payload);
  };
  return (
    <div className="App">
      <Form onClickRegisterButton={registerFunction} />
    </div>
  );
}

export default App;
