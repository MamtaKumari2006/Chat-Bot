const mongoose = require('mongoose');
const Conversation = require('../models/chats.model');
const { Message } = require('../models/message.model');
const { getGroqReply } = require('../services/groq.service');

function estimateTokens(text = '') {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

// Send message + get AI reply
async function sendMessage(req, res) {
    try {
        const { conversationId } = req.params;
        const { content } = req.body || {};

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({
                error: 'Invalid conversation id'
            });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({
                error: 'Message content is required'
            });
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user._id,
            isDeleted: false
        });

        if (!conversation) {
            return res.status(404).json({
                error: 'Conversation not found'
            });
        }

        // 1. Save user message
        const userMessage = await Message.create({
            conversationId: conversation._id,
            role: 'user',
            content: content.trim(),
            status: 'sent',
            tokens: estimateTokens(content),
            responseTime: 0
        });

        // 2. Get full conversation history
        const history = await Message.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 });

        // 3. Format messages for Groq
        const groqMessages = history.map((msg) => ({
            role: msg.role,
            content: msg.content
        }));

        // 4. Call Groq - FIX HERE
        const startTime = Date.now();

        let aiReply = '';
        try {
            aiReply = await getGroqReply({
                model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
                messages: groqMessages
            });
        } catch (groqError) {
            console.log('Groq Error:', groqError.message);

            const failedMessage = await Message.create({
                conversationId: conversation._id,
                role: 'assistant',
                content: 'Failed to generate response',
                status: 'failed',
                tokens: 0,
                responseTime: Date.now() - startTime
            });

            return res.status(500).json({
                error: 'Failed to get AI response',
                userMessage,
                assistantMessage: failedMessage
            });
        }

        const responseTime = Date.now() - startTime;

        // 5. Save assistant reply
        const assistantMessage = await Message.create({
            conversationId: conversation._id,
            role: 'assistant',
            content: aiReply,
            status: 'sent',
            tokens: estimateTokens(aiReply),
            responseTime
        });

        // 6. Title update
        if (!conversation.title || conversation.title === 'New Chat') {
            conversation.title = content.trim().slice(0, 30);
            await conversation.save();
        }

        res.status(201).json({
            message: 'Message sent successfully',
            userMessage,
            assistantMessage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Failed to send message'
        });
    }
}

// Get all messages of one conversation
async function getMessagesByConversation(req, res) {
    try {
        const { conversationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({
                error: 'Invalid conversation id'
            });
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user._id,
            isDeleted: false
        });

        if (!conversation) {
            return res.status(404).json({
                error: 'Conversation not found'
            });
        }

        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 });

        res.status(200).json({
            message: 'Messages fetched successfully',
            count: messages.length,
            conversation,
            messages
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Failed to fetch messages'
        });
    }
}

module.exports = {
    sendMessage,
    getMessagesByConversation
};