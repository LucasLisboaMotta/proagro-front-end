import API from './apiConnection';

const updateRequest = (id, request) => API.put(`exemptionrequests/${id}/`, request).catch((e) => e);

export default updateRequest;
