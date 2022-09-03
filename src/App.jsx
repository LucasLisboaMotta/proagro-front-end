import React from 'react';
import Form from './components/Form';
import ExemptionRequestList from './components/ExemptionRequestList';
import DivergentRequest from './components/DivergentRequest';
import Provider from './context/provider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Form />
        <DivergentRequest />
        <ExemptionRequestList />
      </Provider>
    </div>
  );
}

export default App;
