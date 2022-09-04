import API from './apiConnection';

const postRequest = (payload) => API.post('exemptionrequests/', payload);

export default postRequest;
