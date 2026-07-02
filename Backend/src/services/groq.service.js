async function getGroqReply({ model, messages }) {
  const apiKey = process.env.GROQ_API_KEY;
  const modelName = model || process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to get response from Groq");
  }

  return data?.choices?.[0]?.message?.content || "";
}

module.exports = { getGroqReply };