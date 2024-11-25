import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  console.log('State passed to Results:', state);

  // Ensure resumeKeywords and jobKeywords are arrays
  const resumeKeywords = Array.isArray(state?.resumeKeywords) ? state.resumeKeywords : [];
  const jobKeywords = Array.isArray(state?.jobKeywords) ? state.jobKeywords : [];

  // State to store sorted keywords
  const [sortedResumeKeywords, setSortedResumeKeywords] = useState([]);
  const [sortedJobKeywords, setSortedJobKeywords] = useState([]);

  // State to store matching, missing, and soft matches
  const [matchingKeywords, setMatchingKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [softMatches, setSoftMatches] = useState([]);

  useEffect(() => {
    // Sort keywords alphabetically
    setSortedResumeKeywords([...resumeKeywords].sort((a, b) => a.localeCompare(b)));
    setSortedJobKeywords([...jobKeywords].sort((a, b) => a.localeCompare(b)));

    // Find matching and missing keywords
    const matching = resumeKeywords.filter((keyword) => jobKeywords.includes(keyword));
    const missing = jobKeywords.filter((keyword) => !resumeKeywords.includes(keyword));
    setMatchingKeywords(matching);
    setMissingKeywords(missing);

    // Fetch soft matches from the backend
    if (resumeKeywords.length > 0 && jobKeywords.length > 0) {
      fetchSoftMatches(resumeKeywords, jobKeywords);
    }
  }, [resumeKeywords, jobKeywords]);

  const fetchSoftMatches = async (resumeKeywords, jobKeywords) => {
    try {
      const response = await axios.post('http://localhost:5000/api/documents/match', {
        resumeKeywords,
        jobKeywords,
      });
      setSoftMatches(response.data.softMatches || []);
    } catch (error) {
      console.error('Error fetching soft matches:', error.message);
    }
  };

  return (
    <div>
      <h1>Document Processing Results</h1>
      <button onClick={() => navigate('/')}>Back to Upload</button>

      <h2>Soft Matches:</h2>
      <ul>
        {softMatches.length > 0 ? (
          softMatches.map((match, index) => (
            <li key={index}>
              {match.resumeKeyword} ↔ {match.jobKeyword} (Confidence: {match.confidence.toFixed(2)})
            </li>
          ))
        ) : (
          <p>No soft matches found.</p>
        )}
      </ul>

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

      

      
    </div>
  );
};

export default Results;
