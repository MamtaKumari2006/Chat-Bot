import api from "./axios";

const conversationBase = "/api/conversation";


//create a new conversation
export const createConversation = async (conversationData) => {
  try {
    const res = await api.post(`${conversationBase}/create`, conversationData);
    return res.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};


//get all conversations for the user
export const getConversations = async () => {
  try {
    const res = await api.get(`${conversationBase}/all`);
    return res.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};


//get a conversation by id
export const getConversationById = async (_id) => {
  try {
    const res = await api.get(`${conversationBase}/${_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

//update a conversation
export const updateConversation = async (_id, updateData) => {
  try {
    const res = await api.put(`${conversationBase}/${_id}/rename`, updateData);
    return res.data;
  } catch (error) {
    console.error("Error updating conversation:", error);
    throw error;
  }
};

//delete a conversation
export const deleteConversation = async (_id) => {
  try {
    const res = await api.delete(`${conversationBase}/${_id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};
