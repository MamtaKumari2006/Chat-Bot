import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { useAuth } from "../context/authContext";
import hamburger from "../assets/hamburger.svg";
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
  const { logout, user, loading } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data.conversations || []);
      return data.conversations || [];
    } catch (error) {
      console.log("Error loading conversations:", error);
      return [];
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

  const loadAndSetup = async () => {
    try {
      const data = await getConversations();
      const allConversations = data.conversations || [];
      setConversations(allConversations);

      if (allConversations.length === 0) {
        // koi conversation nahi hai to new banao
        const newData = await createConversation({ title: "New Chat" });
        const newConv = newData.conversation;
        setConversations([newConv]);
        setSelectedConversation(newConv);
        setMessages([]);
      } else {
        // pehli conversation auto select karo
        setSelectedConversation(allConversations[0]);
        const msgData = await getMessagesByConversation(allConversations[0]._id);
        setMessages(msgData.messages || []);
      }
    } catch (error) {
      console.log("Error in setup:", error);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
    } else {
      loadAndSetup();
    }
  }, [user, loading]);

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
  <div className="h-screen text-white flex overflow-hidden bg-linear-to-br from-zinc-950 via-slate-950 to-indigo-950">
    
    <div className={`transition-all duration-300 ${sidebarOpen ? "w-80" : "w-0"} overflow-hidden`}>
      <Sidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onCreateConversation={handleCreateConversation}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onLogout={handleLogout}
        onClose={() => setSidebarOpen(false)}
      />
    </div>

    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-black/10 backdrop-blur-sm">
      
      <div className="sticky top-0 z-10 border-b border-white/5 px-6 py-4 bg-zinc-950/80 backdrop-blur-xl flex items-center gap-4">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-xl hover:text-blue-400 transition"
          >
            <img src={hamburger} alt="hamburger" className="invert w-6 h-6" />
          </button>
        )}

        <div>
          <h1 className="text-lg font-semibold text-white/85">
            {selectedConversation?.title || "AI Chat"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {selectedConversation
              ? "Continue your conversation"
              : "Start a new conversation with AI"}
          </p>
        </div>
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