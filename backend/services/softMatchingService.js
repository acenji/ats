const { OpenAI } = require('openai');
const { openaiApiKey } = require('../config/config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

/**
 * Sanitize and fix JSON response.
 * @param {string} responseText - Raw response text from OpenAI.
 * @returns {object[]} - Parsed JSON array.
 */

const sanitizeJsonResponse = (responseText) => {
  try {
    // Try parsing the JSON directly
    return JSON.parse(responseText);
  } catch (error) {
    console.warn("Malformed JSON detected. Attempting to fix...", error.message);

    // Step 1: Check if the response ends with a valid closing bracket
    if (!responseText.trim().endsWith("]")) {
      console.warn("JSON is missing closing ']'.");

      // Step 2: Find the last valid closing "}"
      const lastClosingBraceIndex = responseText.lastIndexOf("}");
      if (lastClosingBraceIndex !== -1) {
        // Truncate everything after the last "}"
        responseText = responseText.substring(0, lastClosingBraceIndex + 1);
      }

      // Step 3: Add the closing bracket "]"
      responseText = `${responseText.trim()}]`;
    }

    // Attempt parsing again after fixing
    try {
      return JSON.parse(responseText);
    } catch (finalError) {
      console.error("Final fix failed. Unable to parse JSON.", finalError.message);
      throw new Error("Failed to sanitize JSON response.");
    }
  }
};





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

    // Sanitize and parse the JSON response
    const matches = sanitizeJsonResponse(responseText);

    // Validate and sort matches
    matches.forEach((match) => {
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
  } catch (error) {
    console.error("Error during soft matching:", error.message);
    throw new Error("Failed to find soft matches using OpenAI.");
  }
};

module.exports = findSoftMatches;
