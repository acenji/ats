const { OpenAI } = require('openai');
const { openaiApiKey } = require('../config/config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

/**
 * Find soft matches between two sets of keywords using OpenAI.
 * @param {string[]} resumeKeywords - Keywords extracted from the resume.
 * @param {string[]} jobKeywords - Keywords extracted from the job description.
 * @returns {Promise<object[]>} - Array of matched keywords with confidence scores.
 */
const findSoftMatches = async (resumeKeywords, jobKeywords) => {
  console.log("Processing keywords for soft matching:", { resumeKeywords, jobKeywords });

  if (!Array.isArray(resumeKeywords) || !Array.isArray(jobKeywords)) {
    throw new Error("Both resumeKeywords and jobKeywords must be arrays.");
  }

  try {
    const prompt = `
    Match the following keywords from the resume with the keywords from the job description based on semantic similarity.
    Provide matches in the format: 
    [
      {
        "resumeKeyword": "keyword from resume",
        "jobKeyword": "keyword from job description",
        "confidence": 0.85
      },
      ...
    ].

    Resume Keywords: ${resumeKeywords.join(", ")}
    Job Keywords: ${jobKeywords.join(", ")}

    Only respond with the JSON output.`;

    console.log("OpenAI Prompt for Soft Matching:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const matches = JSON.parse(response.choices[0].message.content.trim());
    console.log("Soft Matches from OpenAI:", matches);

    return matches;
  } catch (error) {
    console.error("Error during soft matching:", error.response?.data || error.message);
    throw new Error("Failed to find soft matches using OpenAI.");
  }
};

module.exports = findSoftMatches;

