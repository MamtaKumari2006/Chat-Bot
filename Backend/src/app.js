const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const chatRoutes = require("./routes/chats");
const authRoutes = require("./routes/auth.routes");
const coversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require('./routes/message.route.js');

const app = express();


app.use(cors({
  origin: "http://chat-bot-two-woad.vercel.app",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/conversation", coversationRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/messages', messageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ChatGPT API running" });
});

module.exports = app;