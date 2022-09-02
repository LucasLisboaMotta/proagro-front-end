import API from './apiConnection';

const register = (payload) => API.post('exemptionrequests/', payload);

export default register;
