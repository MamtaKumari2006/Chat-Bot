const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require("axios");
const chat = require('../models/chats.model');
const message = require('../models/message.model');



const chatWithAi = async (req, res) => {
    try {
        const { conversationId, message } = req.body;
        const conversation = await chat.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        // Call OpenAI API
        const response = await axios.post("http://localhost:11434/api/chat", {
      model: "phi3:mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message }
        ],
        stream : false


    });

    const reply = response.data.message.content;

    // Optional: Save to DB
    // await Conversation.create({ userMessage: message, botReply: reply });

    res.status(200).json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error("Ollama Error:", error.message);
    res.status(500).json({
      success: false,
      error: "not able to connect to ollama server check if it is running and the url is correct"
    });
  }


}

module.exports = {
    chatWithAi
}










