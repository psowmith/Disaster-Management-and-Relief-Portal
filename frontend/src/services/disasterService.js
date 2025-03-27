import api from './api';

// Get all disaster reports
export const fetchDisasterReports = async () => {
  const response = await api.get('/disasters');
  return response.data; // Contains an array of disaster reports
};

// Submit a new disaster report
export const submitDisasterReport = async (reportData) => {
  //console.log(reportData);
  const response = await api.post('/disasters', reportData);
  return response.data; // Contains the submitted report info
};

// Get disaster report by ID
export const fetchDisasterReportById = async (id) => {
  const response = await api.get(`/disasters/${id}`);
  return response.data; // Contains specific disaster report details
};

export const updateDisasterReport = async (id, reportData) => {
  const payload = {status:reportData};
  const response = await api.post(`/disasters/${id}`, payload,{
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; // Contains updated disaster report info
};
// Delete a disaster report
export const deleteDisasterReport = async (id) => {
  const response = await api.delete(`/disasters/${id}`);
  return response.data; // Confirmation of deletion
};

// Get all disaster reports (Admin only)
export const fetchAllDisasterReports = async () => {
  const response = await api.get('/disasters');
  return response.data; // Contains all disaster reports
};
