const { OpenAI } = require("openai");

const client = new OpenAI(
  "org-vORayujoPXsiFFQVQFUhKaLj",
  "proj_qCJJ6tEUnom83WUJFzJ2PiPO"
);

async function ask(messages) {
  try {
    return await client.chat.completions.create({
      messages,
      model: process.env.MODEL,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  ask,
};
