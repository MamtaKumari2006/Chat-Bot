async function getGroqReply({ model, messages }) {
  const apiKey = (process.env.GROQ_API_KEY || "").trim().replace(/['"]/g, "");

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing in environment variables!");
  }

  // Tumhare account ki actual available models list (prioritized order mein)
  const workingModels = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.8-27b"
  ];

  for (const currentModel of workingModels) {
    try {
      console.log(`Sending request with active model: ${currentModel}`);

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: currentModel,
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Success! Response received from ${currentModel}`);
        return data?.choices?.[0]?.message?.content || "";
      }

      console.warn(`Model ${currentModel} returned error:`, data?.error?.message);
    } catch (err) {
      console.warn(`Error connecting with ${currentModel}:`, err.message);
    }
  }

  throw new Error("Failed to generate response from available Groq models.");
}

module.exports = { getGroqReply };