const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Configure multer to save files in 'uploads/' directory

router.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Use multer's generated filename as the file ID
  const fileId = req.file.filename; // 'req.file' contains file metadata
  console.log('File uploaded successfully, fileId:', fileId); // Debug log for fileId

  res.json({
    message: 'File uploaded successfully',
    fileId, // Include fileId in the response
  });
});

module.exports = router;
