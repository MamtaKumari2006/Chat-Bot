
import close from "../assets/close.svg";

function Sidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  onLogout,
  onClose,
}) {
  return (
    <div className="w-80 h-screen flex flex-col bg-zinc-950/80 backdrop-blur-md border-r border-white/10">

      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={onCreateConversation}
          className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white py-2.5 px-4 rounded-xl font-medium transition"
        >
          + New Chat
        </button>

        <button
          onClick={onClose}
          className="hover:opacity-80 transition"
        >
          <img src={close} alt="close" className="invert h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {conversations.length === 0 ? (
          <p className="text-zinc-400 text-sm">
            No conversations yet. Start a new chat!
          </p>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition ${
                selectedConversation?._id === conversation._id
                  ? "bg-linear-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20"
                  : "bg-white/5 hover:bg-white/10 border border-transparent"
              }`}
            >
              <p className="text-white text-sm truncate flex-1">
                {conversation.title || "New Chat"}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation._id);
                }}
                className="text-red-400 hover:text-red-300 text-xs ml-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/10 flex justify-center">
        <button
          onClick={onLogout}
          className="w-1/2 bg-red-600/90 hover:bg-red-600 text-white py-2.5 rounded-full font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;