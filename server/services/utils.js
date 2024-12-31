const path = require("path");
const { existsSync, mkdirSync } = require("fs");

/**
 * Convert MB to Bytes
 * @param {number} mb
 * @returns {number}
 */
function mbToBytes(mb) {
  return mb * 1024 * 1024;
}

function getFullDirPath(dirname) {
  const fullPath = path.join(__dirname, "..", dirname);
  if (!existsSync(fullPath)) mkdirSync(fullPath);
  return fullPath;
}

module.exports = {
  mbToBytes,
  getFullDirPath,
};
