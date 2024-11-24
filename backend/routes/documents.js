const express = require('express');
const extractKeywords = require("../services/openaiService");
const router = express.Router();

router.post("/process", async (req, res) => {
  const { fileId, fileText } = req.body;

  if (!fileText) {
    console.error("No text provided for processing");
    return res.status(400).json({ error: "No text provided for processing" });
  }

  try {
    // Use OpenAI to extract keywords
    const keywords = await extractKeywords(fileText);
    console.log("Extracted Keywords from OpenAI:", keywords);

    res.json({
      message: `Document with ID ${fileId} processed successfully.`,
      keywords,
      fileId,
    });
  } catch (error) {
    console.error("Error processing document:", error.message);
    res.status(500).json({ error: "Failed to process the document" });
  }
});

  

module.exports = router;
