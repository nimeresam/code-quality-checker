function getHeaders() {
  const apiKey = process.env.OPENAI_API_KEY;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

/**
 *
 * @param {string} code
 * @returns {Object}
 */
function getBody(code) {
  const model = process.env.MODEL;
  const json = {
    model,
    messages: [
      {
        role: "system",
        content: `You are an expert code reviewer. 
          Analyze the following code for functionality, readability, bestPractices, percentage of overall quality, and suggest improvements.
          Give me the response as one level JSON only without mentioning the code`,
      },
      {
        role: "system",
        content: `I want the response like:
        { functionality: string, readability: string, bestPractices: string, overallQualityPercentage: number, improvements: { [key: string]: string } }
        `,
      },
      {
        role: "user",
        content: `Here's the code:\n\n${code}`,
      },
    ],
  };
  return JSON.stringify(json);
}

/**
 *
 * @param {string} code
 * @returns {
 *  functionality: string,
 *  readability: string,
 *  bestPractices: string,
 *  overallQualityPercentage: number,
 *  improvements: { [key: string]: string }
 * }
 */
async function ask(code) {
  try {
    const endpoint = process.env.OPENAI_ENDPOINT;
    const promise = await fetch(endpoint, {
      method: "POST",
      headers: getHeaders(),
      body: getBody(code),
    });
    const response = await promise.json();
    if (response.error) throw response.error;
    return response.choices[0].message.content;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

module.exports = {
  ask,
};
