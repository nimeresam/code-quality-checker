const { readFileSync, existsSync } = require("fs");
const path = require("path");

// Local Imports
const openaiClient = require("../clients/openai");
const { getFullDirPath } = require("./utils");

/**
 * @async
 * Check code file quality
 * @param {string} fileName
 * @returns {Promise<string>}
 */
async function checkQualityOfFile(fileName) {
  const dirPath = getFullDirPath(process.env.UPLOADS_DIR);
  const filePath = path.join(dirPath, fileName);
  if (!existsSync(filePath))
    throw {
      code: 406,
      message: `File ${fileName} isn't exist`,
    };

  const content = readFileSync(filePath);
  return openaiClient.ask(content);
}

/**
 * Check code text quality
 * @param {string} code
 * @returns {{ [key: string]: string }}
 */
async function checkQualityOfCode(code) {
  return openaiClient.ask(code);
}

module.exports = {
  checkQualityOfFile,
  checkQualityOfCode,
};
