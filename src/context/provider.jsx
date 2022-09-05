import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getAllExemptionRequests from '../api/getAllExemptionRequests';
import context from './context';
import { defaultFilter } from '../utils/filterFunctions';

function Provider({ children }) {
  const [requestArray, setRequestArray] = useState([]);
  const [editRequest, setEditRequest] = useState({ edit: false, prevRequest: {} });
  const [useFilter, setUseFilter] = useState(false);
  const [filterParams, setFilterParams] = useState(defaultFilter);

  const updateRequestArray = async () => {
    const newRequestArray = await getAllExemptionRequests();
    setRequestArray(newRequestArray);
  };

  const value = useMemo(() => ({
    requestArray,
    updateRequestArray,
    editRequest,
    setEditRequest,
    useFilter,
    setUseFilter,
    filterParams,
    setFilterParams,
  }), [
    requestArray,
    updateRequestArray,
    editRequest,
    setEditRequest,
    useFilter,
    setUseFilter,
    filterParams,
    setFilterParams,
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
