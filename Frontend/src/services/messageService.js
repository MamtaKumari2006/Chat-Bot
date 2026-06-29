import api from "./axios";

const MESSAGE_BASE = "/api/messages";

// send message
export const sendMessage = async (_id, messageData) => {
  try {
    const res = await api.post(`${MESSAGE_BASE}/send/${_id}`, messageData);
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

//get all messages of one conversation
export const getMessagesByConversation = async (_id) => {
  try {
    const res = await api.get(`${MESSAGE_BASE}/${_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
