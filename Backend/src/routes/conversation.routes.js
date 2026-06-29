const express = require("express");
const conversationController = require("../controllers/conversation.controller");
const authUser = require("../middlewares/auth.middleware");

const router = express.Router();


router.post("/create",authUser, conversationController.createConversation)

router.get("/all", authUser, conversationController.getConversations);
router.get("/:_id", authUser, conversationController.getConversationById);
router.put("/:_id/rename", authUser, conversationController.updateConversation);
router.delete("/:_id", authUser, conversationController.deleteConversation);



module.exports = router