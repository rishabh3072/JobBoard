// src/services/profileService.js
import axios from 'axios';


export const getEmployerProfile = async () => {
  const response = await axios.get(`http://localhost:4000/api/v1/employer/profile`);
  return response.data;
};

export const updateEmployerProfile = async (profileData) => {
  const response = await axios.put(`http://localhost:4000/api/v1/employer/profile`, profileData);
  return response.data;
};

export const deleteEmployerProfile = async () => {
  const response = await axios.delete(`http://localhost:4000/api/v1/employer/profile`);
  return response.data;
};

export const getJobSeekerProfile = async () => {
  const response = await axios.get(`http://localhost:4000/api/v1/jobseeker/profile`);
  return response.data;
};

export const updateJobSeekerProfile = async (profileData) => {
  const response = await axios.put(`http://localhost:4000/api/v1/jobseeker/profile`, profileData);
  return response.data;
};

export const deleteJobSeekerProfile = async () => {
  const response = await axios.delete(`http://localhost:4000/api/v1/jobseeker/profile`);
  return response.data;
};
