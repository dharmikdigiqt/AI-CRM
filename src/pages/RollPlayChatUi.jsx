import { IconSend } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { Menu, Button, TextInput } from "@mantine/core";

const RollPlayChatUi = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [gender, setGender] = useState("male");
  const [persona, setPersona] = useState("happy");
  const [age, setAge] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = { text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${BASE_URL}/crm-ai/?action=roleplay`, {
        user_input: inputText,
        last_response: messages[messages.length - 1]?.text || "",
        persona,
        age,
        gender,
      });
      
      const serverMessage = { text: response.data?.roleplay_response || "No response received", sender: "server" };
      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-[#3C5AA7] text-white shadow-md">
        <div className="flex items-center gap-3">
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
        <div className="flex gap-4">
          <Menu>
            <Menu.Target>
              <Button variant="light">Gender: {gender}</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setGender("male")}>Male</Menu.Item>
              <Menu.Item onClick={() => setGender("female")}>Female</Menu.Item>
              <Menu.Item onClick={() => setGender("non-binary")}>Non-binary</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu>
            <Menu.Target>
              <Button variant="light">Persona: {persona}</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setPersona("happy")}>Happy</Menu.Item>
              <Menu.Item onClick={() => setPersona("serious")}>Serious</Menu.Item>
              <Menu.Item onClick={() => setPersona("sarcastic")}>Sarcastic</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <TextInput
            placeholder="Age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="w-20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-md px-3 py-2 rounded-lg shadow-md ${
                msg.sender === "user"
                  ? "bg-[#3C5AA7] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <p className="bg-gray-200 px-3 py-2 rounded-lg shadow-md">...</p>
          </div>
        )}
      </div>

      <div className="flex items-center bg-[#222a42] p-3 rounded-full shadow-md m-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent text-white outline-none px-3 placeholder-gray-400"
          placeholder="Type a message..."
          autoFocus
        />
        <button onClick={handleSendMessage} className="p-2">
          <IconSend className="w-6 h-6 text-blue-400 hover:text-blue-500 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default RollPlayChatUi;