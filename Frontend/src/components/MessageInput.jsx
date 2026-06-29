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
  }; // ← ye brace missing thi

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-zinc-800 bg-zinc-950"
    >
      <div className="flex gap-3 items-center">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          disabled={sending}
          className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none resize-none disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white disabled:opacity-50"
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