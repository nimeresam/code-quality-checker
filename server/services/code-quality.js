const openaiClient = require("../clients/openai");

// Load API Key from .env file
const apiKey = process.env.OPENAI_API_KEY;

// Function to check code quality
/**
 * Check code quality via
 * @param {string} code
 * @returns
 */
async function checkCodeQuality(code) {
  return openaiClient.ask(code);
}

module.exports = {
  checkCodeQuality,
};
