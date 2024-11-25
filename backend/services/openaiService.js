const { OpenAI } = require("openai");
const { openaiApiKey } = require("../config/config");

// Debugging: Confirm API key is loaded
if (!openaiApiKey) {
  console.error("OpenAI API Key is missing. Ensure it is set in the config file.");
  throw new Error("OpenAI API Key is not defined.");
}
console.log("Loaded OpenAI API Key:", openaiApiKey);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openaiApiKey,
});
console.log("OpenAI client initialized successfully");

/**
 * Extract keywords from text using OpenAI.
 * @param {string} text - The input text.
 * @returns {Promise<string[]>} - Extracted keywords as an array.
 */
const extractKeywords = async (text) => {
  console.log("Processing text for keyword extraction:", text);

  // Validate input text
  if (!text || text.trim().length === 0) {
    console.error("No valid text provided for keyword extraction.");
    throw new Error("Input text is empty or invalid.");
  }

  try {
    const prompt = `Extract the most relevant and specific keywords from the following text. Focus on:
    - Technical skills (e.g., programming languages, frameworks, tools).
    - Professional achievements (e.g., projects, leadership roles, metrics-driven accomplishments).
    - Senior-level experience indicators (e.g., team management, strategic decision-making, architecture design).
    - Certifications, advanced degrees, and professional memberships. 
    Return a comma-separated list of keywords:\n\n${text}`;

    console.log("OpenAI Prompt:", prompt);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Specify the model (e.g., "gpt-4", "gpt-3.5-turbo")
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100, // Limit the token count to avoid overloading response
    });

    console.log("Response from OpenAI:", response);

    // Extract and process keywords
    const keywords = response.choices[0].message.content
      .trim()
      .split(",")
      .map((keyword) => keyword.trim());

    console.log("Extracted Keywords:", keywords);
    return keywords;
  } catch (error) {
    console.error("Error during keyword extraction:", error.response?.data || error.message);
    throw new Error("Failed to extract keywords using OpenAI.");
  }
};


  
  

  module.exports = extractKeywords;
