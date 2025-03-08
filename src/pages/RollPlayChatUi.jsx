// import React from 'react'

// const RollPlayChatUi = () => {
//   return (

//   )
// }

// export default RollPlayChatUi

import { IconSend } from "@tabler/icons-react";
import { useState } from "react";

const RollPlayChatUi = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, sender: "user" }]);
    setInputText("");
    setIsTyping(true);

    // Simulate server response delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a sample response!", sender: "server" },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-[#3C5AA7] text-white shadow-md">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">Violet Mendoza</h2>
          <p className="text-sm opacity-80">Online</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-xs px-3 py-2 rounded-lg shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <p className="bg-gray-200 px-3 py-2 rounded-lg shadow-md">...</p>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center bg-[#222a42] p-3 rounded-full shadow-md m-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent text-white outline-none px-3 placeholder-gray-400"
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="p-2">
          <IconSend className="w-6 h-6 text-blue-400 hover:text-blue-500" />
        </button>
      </div>
    </div>
  );
};

export default RollPlayChatUi;
