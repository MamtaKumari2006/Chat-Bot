import { useEffect, useRef } from "react";

function ChatWindow({ messages, selectedConversation, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400 bg-transparent">
        <div className="text-center">
          <p className="text-lg font-medium text-white mb-2">
            Welcome to AI Chat
          </p>
          <p className="text-sm text-zinc-400">
            Select a chat or create a new one
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-transparent">
      {messages.length === 0 ? (
        <p className="text-zinc-400 text-center">
          No messages yet. Start a new conversation!
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className={`flex mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-2xl px-4 py-3 rounded-2xl whitespace-pre-wrap shadow-sm ${
                message.role === "user"
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-white/10 backdrop-blur-md text-zinc-100 border border-white/10"
              }`}
            >
              <p className="text-xs mb-1 opacity-70">
                {message.role === "user" ? "You" : "AI"}
              </p>
              <p className="leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
