async function getGroqReply({ model, messages }) {
  const apiKey = process.env.GROQ_API_KEY;
  
  const modelName = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  
  console.log("Groq API Key status:", apiKey ? `Present (Starts with ${apiKey.substring(0, 6)}...)` : "MISSING / UNDEFINED");
  console.log("Using Model:", modelName);

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing in environment variables!");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey.trim()}`,
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
    console.error("Groq Raw Error:", data);
    throw new Error(data.error?.message || "Failed to get response from Groq");
  }

  return data?.choices?.[0]?.message?.content || "";
}

module.exports = { getGroqReply };