import React, { useState } from 'react';
import axios from 'axios';

const JobDescription = ({ onJobDescriptionProcessed }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let extractedKeywords = [];

      if (file) {
        const formData = new FormData();
        formData.append("jobDescription", file);

        const response = await axios.post("http://localhost:5001/api/job/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        extractedKeywords = response.data.keywords;
      } else {
        const response = await axios.post("http://localhost:5001/api/job/keywords", { text: jobDescription });
        extractedKeywords = response.data.keywords;
      }

      onJobDescriptionProcessed(extractedKeywords); // Pass keywords to parent
    } catch (error) {
      console.error("Error processing job description:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Paste job1qwwwwwwwwwwwww description here..."
        value={jobDescription}
        onChange={handleTextChange}
        rows="5"
        cols="50"
      ></textarea>
      <br />
      <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
      <br />
      <button type="submit">Submit Job Description here</button>
    </form>
  );
};

export default JobDescription;
