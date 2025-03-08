import { IconMicrophone, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { Card } from "../components/common/Card";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
      setIsListening(false);
      handleSendMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setSearchText("");
    fetchData(text);
  };

  const fetchData = (query) => {
    setIsLoading(true);
    setTimeout(() => {
      const response = `Result for "${query}"`;
      setMessages((prev) => [...prev, { text: response, sender: "server" }]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="grid grid-cols-3 p-6 gap-6">
        <Card />
        <div className="flex flex-col h-[calc(100vh-48px)] bg-[#1a1a2e] text-white p-4">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-white break-words max-w-[75%] w-fit ${
                  msg.sender === "user"
                    ? "bg-[#007bff] ml-auto" // Dark Blue for sender
                    : "bg-[#4a5568]" //Cool Gray for server response
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex items-center bg-[#222a42] p-3 rounded-full shadow-md">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none px-3 placeholder-gray-400"
              placeholder="Type a message..."
            />

            {/* Voice Search Button */}
            <button onClick={startListening} className="p-2">
              <IconMicrophone
                className={`w-6 h-6 ${
                  isListening ? "text-red-500 animate-pulse" : "text-blue-500"
                }`}
              />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage(searchText)}
              className="p-2"
            >
              <IconSend className="w-6 h-6 text-blue-400 hover:text-blue-500" />
            </button>
          </div>
        </div>
        <div>123</div>
      </div>
    </>
  );
};

export default Chat;
