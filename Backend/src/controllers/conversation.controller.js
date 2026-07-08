const Conversation = require('../models/chats.model');
const { Message } = require('../models/message.model');  

// Create a new conversation
async function createConversation(req, res) {
    try {
        const { title, model } = req.body;
        
        const conversation = await Conversation.create({  
            userId: req.user._id,
            title,
            model
        });

        res.status(201).json({
            message: "Conversation created successfully",
            conversation
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create conversation' });
    }
}

// Get all conversations for a user
async function getConversations(req, res) {
    try {
        const conversations = await Conversation.find({ userId: req.user._id, isDeleted: false }).sort({ updatedAt: -1 });
        res.status(200).json({
      message: "Conversations fetched successfully",
      count: conversations.length,
      conversations
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
}


// Get a single conversation by ID
async function getConversationById(req, res) {
    try {
        const conversation = await Conversation.findOne({ _id: req.params._id, userId: req.user._id, isDeleted: false });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        //all meassages of this conversation
        const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
        res.status(200).json({ conversation, messages });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
}

// Update conversation title or model
async function updateConversation(req, res) {
    try {
        const { title, model } = req.body;
        const conversation = await Conversation.findOne({ _id: req.params._id, userId: req.user._id, isDeleted: false });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        if (title) conversation.title = title;
        if (model) conversation.model = model;
        await conversation.save();
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update conversation' });
    }
}

// Permanent delete a conversation
async function deleteConversation(req, res) {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params._id,
            userId: req.user._id
        });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Pehle us conversation ke saare messages delete karo
        await Message.deleteMany({ conversationId: conversation._id });

        // Fir conversation permanently delete karo
        await Conversation.deleteOne({ _id: conversation._id });

        res.status(200).json({
            message: 'Conversation deleted permanently'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Failed to delete conversation'
        });
    }
}



module.exports = {
    createConversation,
    getConversations,
    getConversationById,
    updateConversation,
    deleteConversation
};

