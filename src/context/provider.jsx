import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getAllExemptionRequests from '../api/getAllExemptionRequests';
import context from './context';

function Provider({ children }) {
  const [requestArray, setRequestArray] = useState([]);

  const updateRequestArray = async () => {
    const newRequestArray = await getAllExemptionRequests();
    setRequestArray(newRequestArray);
  };

  const value = useMemo(() => ({
    requestArray,
    updateRequestArray,
  }), [
    requestArray,
    updateRequestArray,
  ]);

  useEffect(() => { updateRequestArray(); }, []);

  return (
    <context.Provider
      value={value}
    >
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
