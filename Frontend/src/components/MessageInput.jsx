import { useState } from "react";

function MessageInput({ onSendMessage, sending }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSendMessage(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md"
    >
      <div className="flex gap-3 items-center">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          disabled={sending}
          className="flex-1 bg-white/10 text-white placeholder:text-zinc-400 px-4 py-3 rounded-xl outline-none resize-none border border-white/10 focus:border-blue-500/50 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 hover:opacity-90 px-5 py-3 rounded-xl text-white font-medium disabled:opacity-50 transition"
        >
          {sending ? "..." : "Send"}
        </button>
      </div>

      {sending && (
        <p className="text-zinc-400 text-xs mt-2">AI is thinking...</p>
      )}
    </form>
  );
}

export default MessageInput;