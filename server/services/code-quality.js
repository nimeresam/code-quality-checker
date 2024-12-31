const { readFileSync, existsSync } = require("fs");
const path = require("path");

// Local Imports
const openaiClient = require("../clients/openai");

/**
 * @async
 *
 * @param {string} fileName
 * @returns {Promise<string>}
 */
async function checkQualityOfFile(fileName) {
  const filePath = path.join(process.env.UPLOADS_DIR, fileName);
  if (!existsSync(fileName))
    throw {
      code: 406,
      message: `File ${fileName} isn't exist`,
    };

  const content = readFileSync(filePath);
  return openaiClient.ask(content);
}

/**
 * Check code quality via
 * @param {string} code
 * @returns
 */
async function checkQualityOfCode(code) {
  return openaiClient.ask(code);
}

module.exports = {
  checkQualityOfFile,
  checkQualityOfCode,
};
