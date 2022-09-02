import API from './apiConection';

const register = (payload) => API.post('exemptionrequests/', payload);

export default register;
