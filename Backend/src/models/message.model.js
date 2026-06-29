const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    role: {
        type: String,
        enum: ["user", "assistant", "system"],
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["sending", "sent", "failed"],
        default: "sending"
    },
    tokens: {
        type: Number,
        default: 0
    },
    responseTime: {
        type: Number,
        default: 0
    },
    isEdited: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports.Message = mongoose.model('Message', messageSchema);