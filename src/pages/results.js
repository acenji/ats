import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Progress } from 'antd';
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

  // Loading state for progress bar
  const [loadingProgress, setLoadingProgress] = useState(0); // Properly define state here
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Start loading
    setLoadingProgress(0); // Initialize progress
    try {
      // Simulate incremental progress
      setTimeout(() => setLoadingProgress(25), 500); // 25% after 500ms
      setTimeout(() => setLoadingProgress(50), 1000); // 50% after 1 second
      setTimeout(() => setLoadingProgress(75), 1500); // 75% after 1.5 seconds
      const response = await axios.post('http://localhost:5001/api/documents/match', {
        resumeKeywords,
        jobKeywords,
      });

      // Validate JSON response
      let softMatches = [];
      try {
        softMatches = response.data.softMatches || [];
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError.message);
        throw new Error('Failed to parse JSON response from OpenAI.');
      }

      // Set the final progress and update state with response
      setLoadingProgress(100);

      setSoftMatches(response.data.softMatches || []);
    } catch (error) {
      console.error('Error fetching soft matches:', error.message);
    } finally {
     // Add a small delay before hiding the progress bar for better UX
      setTimeout(() => {
        setIsLoading(false); // End loading
        setLoadingProgress(0); // Reset progress
      }, 500);
    }
  };

  return (
    <div>
      <h1>Document Processing Results</h1>
      <button onClick={() => navigate('/')}>Back to Upload</button>

      {/* Progress Bar */}
      {isLoading && (
        <div style={{ margin: '20px auto', width: '50%' }}> {/* Adjust width here */}
          <Progress percent={loadingProgress} status="active" style={{ margin: '0 auto' }} />
          <p style={{ textAlign: 'center' }}>Fetching soft matches... ({loadingProgress}%)</p>
        </div>
      )}



      <h2>Soft Matches:</h2>
      <ul>
        {softMatches.length > 0 ? (
          softMatches.map((match, index) => (
            <li key={index}>
              {match.resumeKeyword} ↔ {match.jobKeyword} (Confidence: {match.confidence.toFixed(2)})
            </li>
          ))
        ) : !isLoading ? (
          <p>No soft matches found.</p>
        ) : null}
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
