import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  // Ensure resumeKeywords and jobKeywords are arrays
  const resumeKeywords = Array.isArray(state?.resumeKeywords) ? state.resumeKeywords : [];
  const jobKeywords = Array.isArray(state?.jobKeywords) ? state.jobKeywords : [];

  // Sort keywords alphabetically
  const sortedResumeKeywords = [...resumeKeywords].sort((a, b) => a.localeCompare(b));
  const sortedJobKeywords = [...jobKeywords].sort((a, b) => a.localeCompare(b));

  // Find missing keywords
  const missingKeywords = sortedJobKeywords.filter(
    (keyword) => !sortedResumeKeywords.includes(keyword)
  );

  // Find matching keywords
  const matchingKeywords = sortedResumeKeywords.filter((keyword) =>
    sortedJobKeywords.includes(keyword)
  );

  return (
    <div>
      <h1>Document Processing Results</h1>

      <h2>Keywords Extracted from Resume (Alphabetical):</h2>
      <ul>
        {sortedResumeKeywords.length > 0 ? (
          sortedResumeKeywords.map((keyword, index) => <li key={index}>{keyword}</li>)
        ) : (
          <p>No keywords extracted from resume.</p>
        )}
      </ul>

      <h2>Keywords Extracted from Job Description (Alphabetical):</h2>
      <ul>
        {sortedJobKeywords.length > 0 ? (
          sortedJobKeywords.map((keyword, index) => <li key={index}>{keyword}</li>)
        ) : (
          <p>No keywords extracted from job description.</p>
        )}
      </ul>

      <h2>Matching Keywords (Alphabetical):</h2>
      <ul>
        {matchingKeywords.length > 0 ? (
          matchingKeywords.map((keyword, index) => <li key={index}>{keyword}</li>)
        ) : (
          <p>No matching keywords found.</p>
        )}
      </ul>

      <h2>Missing Keywords (Alphabetical):</h2>
      <ul>
        {missingKeywords.length > 0 ? (
          missingKeywords.map((keyword, index) => <li key={index}>{keyword}</li>)
        ) : (
          <p>All keywords from job description are present in the resume.</p>
        )}
      </ul>

      <button onClick={() => navigate('/')}>Back to Upload</button>
    </div>
  );
};

export default Results;
