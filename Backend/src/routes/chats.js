const express = require("express");

const chatController = require("../controllers/chats.controller");




const router = express.Router();

router.post("/", chatController.chatWithAi);



module.exports = router;

