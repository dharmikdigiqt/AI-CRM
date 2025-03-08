import {
  IconChevronDown,
  IconClock,
  IconMicrophone,
  IconPaperclip,
  IconSend,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "../components/common/Card";
import { Accordion } from "@mantine/core";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("FAQ");
  const chatContainerRef = useRef(null);
  
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(searchText);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="grid grid-cols-3 p-6 gap-6">
        <div className="h-[calc(100vh-48px)] overflow-hidden hover:overflow-y-auto flex flex-col gap-6 transition-all duration-300 scrollbar-custom">
          <Card className="p-6 flex flex-col gap-4 border-none rounded-xl bg-white max-w-md">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-lg text-xl font-bold text-blue-700">
                  VM
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-orange-100 text-orange-600 rounded-full px-3 py-1 flex items-center gap-x-1">
                  <span>🔥 Hot lead</span>
                  <IconChevronDown />
                </div>

                <h2 className="text-xl font-semibold text-[#4B465C]">
                  Violet Mendoza
                </h2>
              </div>
            </div>
            <div className="text-[#4B465C] space-y-2">
              <p>
                <span className="font-semibold">Mobile:</span> (123) 456-7890
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                vafgot@vultukir.org
              </p>
              <p>
                <span className="font-semibold">Product:</span> Term Plan
              </p>
            </div>
          </Card>
          <Card className="p-6 flex flex-col gap-4 border-none rounded-xl bg-white max-w-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#3C5AA7] flex items-center justify-center rounded-lg">
                <IconClock className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-[#4B465C]">Time in Los Angeles, CA, USA</p>
                <h2 className="text-2xl font-bold text-[#4B465C] pt-2">
                  11:43pm
                </h2>
                <p className="text-[#4B465C]">
                  Thursday, 16 January 2025 (GMT-8)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col gap-4 border-none rounded-xl bg-white max-w-md">
            <p className="text-[#4B465C]">
              Other details fetched from the cloud.
            </p>
            <ul className="text-[#4B465C] space-y-2 list-disc pl-5">
              <li>
                Lead Project Manager at Software Technolabs for the past 5 years
                in Culver City, Los Angeles.
              </li>
              <li>Salary range: $115,925 - $160,689.</li>
              <li>Hobbies - [ Games | Hiking | Cooking ]</li>
              <li>Completed B-Tech from Noble Group of Institutions.</li>
            </ul>
          </Card>
          <Card className="p-6 flex flex-col gap-4 border-none rounded-xl bg-white max-w-md">
            <p className="text-[#4B465C]">Source details</p>
            <div className="text-[#4B465C] space-y-2">
              <p>
                <span className="font-semibold">Source:</span> Website
              </p>
              <p>
                <span className="font-semibold">Reference:</span>{" "}
                <a href="#" className="text-[#3C5AA7]">
                  blog/children-education-plan...
                </a>
              </p>
              <p>
                <span className="font-semibold">Location:</span> Gujarat, India
              </p>
              <p>
                <span className="font-semibold">Device:</span> Mobile
              </p>
              <p>
                <span className="font-semibold">Avg time:</span> 1.02Min
              </p>
              <p>
                <span className="font-semibold">Total visit:</span> 4 time
              </p>
              <p>
                <span className="font-semibold">Date:</span> 27 Dec 2024, 11:26
                AM
              </p>
            </div>
          </Card>

          <Card className="p-6 flex flex-col gap-2 border-none rounded-xl bg-white max-w-md">
            <p className="text-[#4B465C]">Also Interested In</p>
            <h2 className="text-lg font-semibold text-[#4B465C]">
              Health & Accident Insurance
            </h2>
            <p className="text-[#4B465C]">02 Feb 2024, 11:26 AM</p>
            <p>
              <span className="font-semibold text-[#4B465C]">Reference:</span>{" "}
              <a href="#" className="text-[#3C5AA7]">
                digiqt/health-insurance.com
              </a>
            </p>
          </Card>
        </div>
        <div className="h-[calc(100vh-48px)] overflow-hidden hover:overflow-y-auto flex flex-col gap-6 transition-all duration-300 scrollbar-custom">
          <Card className="p-6 flex flex-col gap-4 border-none rounded-xl bg-[#3C5AA7] text-white max-w-md">
            <h2 className="text-xl font-semibold">Roll Play</h2>
            <p className="opacity-80">
              Experience real-time interactions with AI like are dealing with a
              real customer. See how it feels to chat with technology that
              understands your needs.
            </p>
            <button className="bg-white text-[#3C5AA7] px-4 py-2 rounded-md font-semibold cursor-pointer">
              Let's Start
            </button>
          </Card>
          <div className="bg-white p-4 rounded-lg shadow-md text-[#4B465C] max-w-md">
            <h2 className="font-semibold text-lg">Chat Summary</h2>
            <p className="bg-primary-200 rounded-b-lg text-sm text-primary-150">
              Lead is interested in a Child Education Plan for their 6-year-old,
              with a ₹3,000–₹4,000 monthly budget and ₹20–25 lakh goal. A call
              is scheduled for tomorrow at 11 AM.
            </p>
          </div>
          <div className="max-w-md">
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                  activeTab === "FAQ"
                    ? "bg-[#3C5AA7] text-white"
                    : "text-[#A8AAAE]"
                }`}
                onClick={() => setActiveTab("FAQ")}
              >
                FAQ
              </button>

              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                  activeTab === "Objections"
                    ? "bg-[#3C5AA7] text-white"
                    : "text-[#A8AAAE]"
                }`}
                onClick={() => setActiveTab("Objections")}
              >
                Objections
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-[#4B465C] mt-6">
              <h2 className="font-semibold text-lg mb-2">{activeTab}</h2>
              <Accordion
                className="bg-white px-4 py-5 rounded-lg mt-3 md:mt-0"
                classNames={{
                  chevron:
                    "transform transition-transform duration-300 group-[&[aria-expanded=true]]:rotate-180",
                  control: "group",
                }}
                chevronPosition="right"
              >
                <Accordion.Item
                  className="rounded-lg border border-solid border-[#dad9d9] mb-4 p-4"
                  value="1"
                >
                  <Accordion.Control className="flex hover:bg-primary-200 bg-primary-200 rounded-t-lg justify-between items-center text-lg cursor-pointer">
                    What does my car insurance cover?
                  </Accordion.Control>
                  <Accordion.Panel className="bg-primary-200 rounded-b-lg text-sm text-primary-150">
                    Car insurance typically covers damage to your vehicle,
                    liability for injuries, and theft or natural disasters.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className="rounded-lg border border-solid border-[#dad9d9] mb-4 p-4"
                  value="2"
                >
                  <Accordion.Control className="flex hover:bg-primary-200 bg-primary-200 rounded-t-lg justify-between items-center text-lg cursor-pointer">
                    How do I file a claim?
                  </Accordion.Control>
                  <Accordion.Panel className="bg-primary-200 rounded-b-lg text-sm text-primary-150">
                    You can file a claim by contacting your insurer, providing
                    necessary documents, and following their claim process.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className="rounded-lg border border-solid border-[#dad9d9] mb-4 p-4"
                  value="3"
                >
                  <Accordion.Control className="flex hover:bg-primary-200 bg-primary-200 rounded-t-lg justify-between items-center text-lg cursor-pointer">
                    What is the claim processing time?
                  </Accordion.Control>
                  <Accordion.Panel className="bg-primary-200 rounded-b-lg text-sm text-primary-150">
                    The time varies but typically takes 7-14 business days.
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
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
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                } px-4 py-2`}
              >
                <img
                  src={msg.sender === "user" ? "https://i.pravatar.cc/150?img=12" : "/Bot.svg"}
                  alt="Avatar"
                  className="size-10 rounded-full bg-orange-400"
                />
                <div
                  className={`p-3 rounded-lg text-[#4B465C] max-w-[75%] border border-[#5D596C]/50 ${
                    msg.sender === "user" ? "bg-[#EAF0FF]" : "bg-transparent"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center bg-gray-100 p-3 border-t">
            <button className="p-2 text-gray-500">
              <IconPaperclip className="w-6 h-6 cursor-pointer" />
            </button>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 bg-transparent outline-none px-3 text-gray-700"
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Type a message..."
            />
            <button onClick={startListening} className="p-2">
              <IconMicrophone
                className={`w-6 h-6 cursor-pointer ${
                  isListening ? "text-red-500 animate-pulse" : "text-gray-500"
                }`}
              />
            </button>
            <button
              onClick={() => handleSendMessage(searchText)}
              className="p-2"
            >
              <IconSend className="w-6 h-6 text-[#3C5AA7] cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
