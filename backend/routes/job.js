const express = require('express');
const router = express.Router();
const extractKeywords = require('../services/openaiService'); // Ensure OpenAI service is imported

/**
 * POST /api/job/keywords
 * Endpoint for extracting keywords from pasted job description text
 */
router.post('/keywords', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided for keyword extraction' });
  }

  try {
    console.log('Received job description text:', text);

    // Extract keywords using OpenAI
    const keywords = await extractKeywords(text);
    console.log('Extracted keywords from job description:', keywords);

    res.json({ keywords });
  } catch (error) {
    console.error('Error extracting keywords from job description:', error.message);
    res.status(500).json({ error: 'Failed to extract keywords using OpenAI' });
  }
});

module.exports = router;
