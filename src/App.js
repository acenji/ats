import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import Results from './pages/results';

const App = () => {
  const [resumeKeywords, setResumeKeywords] = useState([]);
  const [jobDescriptionKeywords, setJobDescriptionKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);

  // Handle Resume Keywords
  const handleResumeKeywordsExtracted = (keywords) => {
    setResumeKeywords(keywords);
    console.log("Resume Keywords:", keywords);
  };

  // Handle Job Description Keywords
  const handleJobDescriptionProcessed = (descriptionKeywords) => {
    setJobDescriptionKeywords(descriptionKeywords);

    // Compare Keywords
    const missing = descriptionKeywords.filter((keyword) => !resumeKeywords.includes(keyword));
    setMissingKeywords(missing);
    console.log("Missing Keywords:", missing);
  };

  return (
    <Router>
      <Routes>
        {/* Main Upload Screen */}
        <Route
          path="/"
          element={
            <FileUpload
              onKeywordsExtracted={handleResumeKeywordsExtracted}
              onJobDescriptionProcessed={handleJobDescriptionProcessed}
            />
          }
        />

        {/* Results Screen */}
        <Route
          path="/results"
          element={
            <Results
              resumeKeywords={resumeKeywords}
              jobDescriptionKeywords={jobDescriptionKeywords}
              missingKeywords={missingKeywords}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
