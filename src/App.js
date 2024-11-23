import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import Results from './pages/results'; // Make sure the path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/results" element={<Results />} /> {/* Define the /results route */}
      </Routes>
    </Router>
  );
};

export default App;

