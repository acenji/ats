const express = require('express');
const router = express.Router();

router.post('/process', (req, res) => {
    const { fileId } = req.body;
  
    if (!fileId) {
      return res.status(400).json({ error: 'fileId is required' });
    }
  
    const result = {
      message: `Document with ID ${fileId} processed successfully.`,
      keywords: ['teamwork', 'problem-solving', 'communication'],
      fileId, // Ensure fileId is included in the response
    };
  
    res.json(result);
  });
  

module.exports = router;
