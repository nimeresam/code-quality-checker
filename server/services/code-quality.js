const openaiClient = require("../clients/openai");

/**
 * Check code quality via
 * @param {string} codeSnippet
 * @returns
 */
async function checkCodeQuality(codeSnippet) {
  const messages = [
    {
      role: "system",
      content:
        "You are an expert code reviewer. Analyze the following code for quality, maintainability, and suggest improvements.",
    },
    {
      role: "user",
      content: `Here's the code, I want the result as json:\n\n${codeSnippet}`,
    },
  ];

  try {
    const response = openaiClient.ask(messages);
    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  checkCodeQuality,
};
