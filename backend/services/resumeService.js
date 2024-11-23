import axios from 'axios';

// Function to upload resume
export const uploadResume = async (formData) => {
  try {
    const response = await axios.post('/api/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};
