/**
 * Get a unique name of file by appending the current date
 * @param {string} name
 * @returns {string}
 */
function getUniqueName(name) {
  return `${Date.now()}-${name}`;
}

/**
 * Convert MB to Bytes
 * @param {number} mb
 * @returns {number}
 */
function mbToBytes(mb) {
  return mb * 1024 * 1024;
}

module.exports = {
  getUniqueName,
  mbToBytes,
};
