import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  if (!data) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>No results available. Please upload a document first.</p>
        <button onClick={() => navigate('/')} aria-label="Back to Upload">
          Back to Upload
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Document Processing Results</h1>
      <p>
        Document with ID: <strong>{data.fileId}</strong> processed successfully.
      </p>
      <h2>Extracted Keywords:</h2>
      {data.keywords.length > 0 ? (
        <ul>
          {data.keywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      ) : (
        <p>No keywords extracted.</p>
      )}
      <button onClick={() => navigate('/')} aria-label="Back to Upload">
        Back to Upload
      </button>
    </div>
  );
};

export default Results; // Ensure this line is present
