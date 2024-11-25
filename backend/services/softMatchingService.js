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
    
    - All numbers (e.g., confidence) must be valid decimals between 0 and 1.
    - Ensure the response is valid JSON with no extra text or formatting.
    - Do not include explanations, headers, or footers.

    Resume Keywords: ${resumeKeywords.join(", ")}
    Job Keywords: ${jobKeywords.join(", ")}

    Respond with only the JSON array.
    `;

    console.log("OpenAI Prompt for Soft Matching:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    let responseText = response.choices[0].message.content.trim();
    console.log("Raw Response from OpenAI:", responseText);

    // Remove extraneous text, if any
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```(?:json)?/g, "").trim();
    }

    try {
      // Parse the JSON response
      const matches = JSON.parse(responseText);

      // Validate and sort matches
      matches.forEach(match => {
        if (
          typeof match.resumeKeyword !== "string" ||
          typeof match.jobKeyword !== "string" ||
          typeof match.confidence !== "number" ||
          match.confidence < 0 ||
          match.confidence > 1
        ) {
          throw new Error(`Invalid match data: ${JSON.stringify(match)}`);
        }
      });

      matches.sort((a, b) => b.confidence - a.confidence);
      console.log("Sorted Matches:", matches);

      return matches;
    } catch (jsonError) {
      console.error("Error parsing OpenAI response:", responseText, jsonError.message);
      throw new Error("Failed to parse JSON response from OpenAI.");
    }
  } catch (error) {
    console.error("Error during soft matching:", error.message);
    throw new Error("Failed to find soft matches using OpenAI.");
  }
};

module.exports = findSoftMatches;
