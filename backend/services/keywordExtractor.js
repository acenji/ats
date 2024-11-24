const { Configuration, OpenAIApi } = require('openai');
const { openaiApiKey } = require('../config/config'); // Import API key from config

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

/**
 * Extract keywords from text using OpenAI.
 * @param {string} text - The input text.
 * @returns {Promise<string[]>} - Extracted keywords as an array.
 */
const extractKeywords = async (text) => {
  try {
    const prompt = `Extract relevant keywords from the following text. Only return a comma-separated list of keywords:\n${text}`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50,
    });

    const keywords = response.data.choices[0].text
      .trim()
      .split(',')
      .map((keyword) => keyword.trim());

    return keywords;
  } catch (error) {
    console.error('Error extracting keywords:', error.message);
    throw new Error('Failed to extract keywords');
  }
};

module.exports = extractKeywords;
