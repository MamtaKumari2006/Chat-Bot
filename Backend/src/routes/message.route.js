const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');
const authUser = require('../middlewares/auth.middleware');

router.post('/send/:conversationId', authUser, messageController.sendMessage);
router.get('/:conversationId', authUser, messageController.getMessagesByConversation);

module.exports = router;