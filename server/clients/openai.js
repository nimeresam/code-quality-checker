const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

async function ask(messages) {
  try {
    return await client.chat.completions.create({
      messages,
      model: process.env.MODEL,
      temperature: 0.7,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  ask,
};
