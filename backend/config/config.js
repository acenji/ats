require('dotenv').config();

module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY,
};

console.log("Loaded OpenAI API Key:", process.env.OPENAI_API_KEY);
