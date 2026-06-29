

function Sidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  onLogout,
}) {
  return (
    <div className="w-80 bg-zinc-900 border-r border-zinc-800 h-screen flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <button
          onClick={onCreateConversation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          + New Chat
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
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${
                selectedConversation?._id === conversation._id
                  ? "bg-zinc-700"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <p className="text-white text-sm truncate flex-1">
                {conversation.title || "New Chat"}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation._id);
                }}
                className="text-red-400 text-xs ml-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;