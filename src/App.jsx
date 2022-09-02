import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import register from './api/registerExemptionRequests';
import ExemptionRequestList from './components/ExemptionRequestList';
import getAllExemptionRequests from './api/getAllExemptionRequests';
import './App.css';

function App() {
  const [requestArray, setRequestArray] = useState([]);

  const updateRequestArray = async () => {
    const newRequestArray = await getAllExemptionRequests();
    setRequestArray(newRequestArray);
  };

  const registerFunction = async (payload) => {
    await register(payload);
    updateRequestArray();
  };

  useEffect(() => {
    updateRequestArray();
  }, []);

  return (
    <div className="App">
      <Form onClickRegisterButton={registerFunction} />
      <ExemptionRequestList requestArray={requestArray} />
    </div>
  );
}

export default App;
