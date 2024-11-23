const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const extractKeywords = require('../services/keywordExtractor');

// API to handle file upload and keyword extraction
router.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const keywords = extractKeywords(filePath); // Example usage
  res.status(200).json({ message: 'File uploaded successfully', keywords });
});

module.exports = router;

