import API from './apiConnection';

const headers = { headers: { 'Access-Control-Allow-Origin': 'http://localhost:8000', 'content-type': 'aplication/json' } };

const deleteRequest = (id) => API.delete(`exemptionrequests/${id}`, headers);

export default deleteRequest;
