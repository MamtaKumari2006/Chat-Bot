import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { useAuth } from "../context/authContext";
import {
  createConversation,
  getConversations,
  deleteConversation,
} from "../services/conversationService";
import {
  sendMessage,
  getMessagesByConversation,
} from "../services/messageService";

function Chat() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data.conversations || []);
    } catch (error) {
      console.log("Error loading conversations:", error);
    }
  };

  const loadMessages = async (_id) => {
    try {
      setLoadingMessages(true);
      const data = await getMessagesByConversation(_id);
      setMessages(data.messages || []);
    } catch (error) {
      console.log("Error loading messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      loadConversations();
    }
  }, []);

  const handleCreateConversation = async () => {
    try {
      const data = await createConversation({ title: "New Chat" });
      await loadConversations();
      setSelectedConversation(data.conversation);
      setMessages([]);
    } catch (error) {
      console.log("Error creating conversation:", error);
    }
  };

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    await loadMessages(conversation._id);
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedConversation) return;
    setSendingMessage(true);

    try {
      const data = await sendMessage(selectedConversation._id, {
        content: messageText,
      });

      setMessages((prev) => [
        ...prev,
        data.userMessage,
        data.assistantMessage,
      ]);

      await loadConversations();
    } catch (error) {
      console.log("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleDeleteConversation = async (_id) => {
    try {
      await deleteConversation(_id);
      setConversations(conversations.filter((conv) => conv._id !== _id));
      if (selectedConversation?._id === _id) {
        setSelectedConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.log("Error deleting conversation:", error);
    }
  };

  return (
    <div className="h-screen bg-zinc-950 text-white flex">
      <Sidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onCreateConversation={handleCreateConversation}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-zinc-800 px-6 py-4 bg-zinc-900">
          <h1 className="text-lg font-semibold">
            {selectedConversation?.title || "AI Chat"}
          </h1>
        </div>

        <ChatWindow
          messages={messages}
          selectedConversation={selectedConversation}
          loading={loadingMessages}
        />

        <MessageInput
          onSendMessage={handleSendMessage}
          sending={sendingMessage}
        />
      </div>
    </div>
  );
}

export default Chat;