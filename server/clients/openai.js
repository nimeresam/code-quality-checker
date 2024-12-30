function getHeaders() {
  const apiKey = process.env.OPENAI_API_KEY;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

function getBody(code) {
  console.log("code", code);
  const model = process.env.MODEL;
  const json = {
    model,
    messages: [
      {
        role: "system",
        content:
          "You are an expert code reviewer. Analyze the following code for quality, maintainability, and suggest improvements.",
      },
      {
        role: "user",
        content: `Here's the code:\n\n${code}`,
      },
    ],
  };
  return JSON.stringify(json);
}

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
