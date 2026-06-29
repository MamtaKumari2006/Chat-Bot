import { useEffect, useRef } from "react";

function ChatWindow({ messages, selectedConversation, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400">
        <p>Select a chat or create a new one</p>
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
    <div className="flex-1 p-4 overflow-y-auto bg-zinc-950">
      {messages.length === 0 ? (
        <p className="text-zinc-400 text-center">
          No messages yet. Start a new conversation!
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className={`flex mb-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-2xl px-4 py-3 rounded-xl whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-100"
              }`}
            >
              <p className="text-xs mb-1 opacity-60">
                {message.role === "user" ? "You" : "AI"}
              </p>
              <p>{message.content}</p>
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;