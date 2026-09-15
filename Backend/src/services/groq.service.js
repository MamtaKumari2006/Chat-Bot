async function getGroqReply({ model, messages }) {
  let apiKey = (process.env.GROQ_API_KEY || "").trim().replace(/['"]/g, "");
  let modelName = (model || process.env.GROQ_MODEL || "llama-3.3-70b-versatile").trim().replace(/['"]/g, "");

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing in environment variables!");
  }

  // Fallback models agar pehla model fail ho jaye
  const fallbackModels = [
    modelName,
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "gemma2-9b-it"
  ];

  // Unique model list
  const modelsToTry = [...new Set(fallbackModels)];

  for (const currentModel of modelsToTry) {
    try {
      console.log(`Trying Groq model: ${currentModel}`);

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
        console.log(`Success with model: ${currentModel}`);
        return data?.choices?.[0]?.message?.content || "";
      }

      console.warn(`Model ${currentModel} failed:`, data?.error?.message);
    } catch (err) {
      console.warn(`Network error with model ${currentModel}:`, err.message);
    }
  }

  // Agar saare predefined models fail ho jayein, toh Groq se direct list mangwao
  try {
    const listRes = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const listData = await listRes.json();
    console.log("Your account's available Groq models:", listData?.data?.map(m => m.id));
  } catch (e) {
    console.error("Could not fetch models list:", e.message);
  }

  throw new Error("All Groq models failed. Check Render logs for available models list.");
}

module.exports = { getGroqReply };