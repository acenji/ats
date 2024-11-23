import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

const FileUpload = () => {
  const navigate = useNavigate(); // Initialize navigation

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
      // Get uploaded file information
      const fileInfo = result.successful[0];
      console.log('Uploaded File Info:', fileInfo);
      console.log('File ID:', fileInfo.response.body.fileId);

      // Perform post-upload document processing
      await handleDocumentProcessing(fileInfo);
    } catch (error) {
      console.error('Error during post-upload processing:', error);
    }
  });

  const handleDocumentProcessing = async (fileInfo) => {
    try {
      console.log('File ID for processing:', fileInfo.response.body.fileId);
  
      const response = await axios.post('http://localhost:5000/api/documents/process', {
        fileId: fileInfo.response.body.fileId, // Send fileId from upload response
      });
  
      console.log('Document Processing Results:', response.data);
  
      // Navigate to results page and pass the data
      navigate('/results', { state: { data: response.data } });
    } catch (error) {
      console.error('Error processing document:', error);
    }
  };
  

  return <Dashboard uppy={uppy} />;
};

export default FileUpload;
