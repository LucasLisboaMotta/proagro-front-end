import API from './apiConnection';

const deleteRequest = (id) => API.delete(`exemptionrequests/${id}`);

export default deleteRequest;
