const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'new chat'
    },
    lastMessage: {
        type: String,
    },
    model: {
    type: String,
    default: process.env.OLLAMA_MODEL || 'phi3:mini'
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);