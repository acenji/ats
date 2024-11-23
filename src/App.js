import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
      </Routes>
    </Router>
  );
};

export default App;

