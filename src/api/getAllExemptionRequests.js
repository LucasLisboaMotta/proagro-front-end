import API from './apiConnection';

const getAllExemptionRequests = async () => {
  const { data } = await API.get('exemptionrequests/');
  return data;
};

export default getAllExemptionRequests;
