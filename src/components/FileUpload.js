import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import axios from 'axios';

const FileUpload = () => {
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['.pdf', '.doc', '.docx'] },
    autoProceed: true,
  });

  // Configure Uppy to upload files to the backend API
  uppy.use(XHRUpload, {
    endpoint: 'http://localhost:5000/api/resume/upload', // Backend API endpoint
    formData: true,
    fieldName: 'resume',
  });

  uppy.on('complete', async (result) => {
    if (!result.successful.length) {
      console.error('No files uploaded successfully:', result);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('resume', result.successful[0].data);
      const response = await axios.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  });

  return <Dashboard uppy={uppy} />;
};

export default FileUpload;
