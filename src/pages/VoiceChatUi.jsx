import { IconMicrophone } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Select } from "@mantine/core";
import { toast } from "sonner";

const VoiceChatUi = ({ setObjections }) => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const recognitionRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = language;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;

    setIsListening(true);
    recognitionRef.current.start();

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      handleSendMessage(transcript);
    };

    recognitionRef.current.onend = () => {
      if (isCalling) {
        recognitionRef.current.start();
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    fetchData(text);
  };

  const fetchData = async (query) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/crm-ai/?action=voicebot`, {
        text: query,
        email: "dharmik@digiqt.com",
      });
      setMessages((prev) => [
        ...prev,
        { text: response?.data?.output, sender: "server" },
      ]);
      speakText(response?.data?.output);
      if (response?.data?.objections) {
        setObjections(response?.data?.objections);
        stopListening();
        setIsCalling(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
      speakText(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language;
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  const toggleCall = () => {
    if (isCalling) {
      stopListening();
    } else {
      startListening();
    }
    setIsCalling(!isCalling);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-white shadow-lg rounded-lg overflow-hidden">
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
        <Select
          data={[
            { value: "en-US", label: "English" },
            { value: "hi-IN", label: "Hindi" },
          ]}
          value={language}
          onChange={setLanguage}
          className="ml-auto w-36"
          placeholder="Select Language"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "flex-row-reverse" : ""
            } px-4 py-2`}
          >
            <p className="bg-gray-200 rounded-lg p-2">{msg?.text}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center bg-gray-100 p-3 border-t flex-col gap-2">
        <button
          onClick={startListening}
          className={`p-2 ${
            isListening ? "animate-pulse bg-red-500" : "bg-gray-300"
          } rounded-full`}
        >
          <IconMicrophone
            className={`w-6 h-6 cursor-pointer ${
              isListening ? "text-white" : "text-gray-500"
            }`}
          />
        </button>
        <button
          onClick={toggleCall}
          className={`p-3 text-white font-semibold rounded-lg w-full cursor-pointer ${
            isCalling ? "bg-red-500" : "bg-[#3C5AA7]"
          }`}
        >
          {isCalling ? "Hang Up" : "Call"}
        </button>
      </div>
    </div>
  );
};

export default VoiceChatUi;
