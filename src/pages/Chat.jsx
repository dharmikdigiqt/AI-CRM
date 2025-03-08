import { useState } from "react";
import { Card } from "../components/common/Card";
import VoiceChatUi from "./VoiceChatUi";
import ChatUi from "./ChatUi";
import { useClipboard } from "@mantine/hooks";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Chat = () => {
  const [objections, setObjections] = useState(null);
  const [textToCopy, setTextToCopy] = useState();
  const clipboard = useClipboard({ timeout: 1000 });

  const handleCopy = () => clipboard.copy(textToCopy);

  console.log("textToCopy::::", textToCopy);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "gu" });
  const stopListening = () => SpeechRecognition.stopListening();

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  console.log("transcript:::::", transcript);

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <VoiceChatUi setObjections={setObjections} />
        </div>
        <div>
          {objections && (
            <div className="mx-10">
              <div className="bg-white p-4 rounded-lg shadow-md text-[#4B465C] mt-6 px-10">
                <h2 className="font-semibold text-lg mb-2">Objections</h2>
                <p className="bg-primary-200 rounded-b-lg text-sm text-primary-150">
                  {objections}
                </p>
              </div>
            </div>
          )}
          <div className="container mx-auto p-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Speech to Text Converter
            </h2>
            <p className="text-gray-600 mt-2">
              A React hook that converts speech from the microphone to text.
            </p>

            {/* Speech Text Display */}
            <div
              className="border border-gray-300 p-4 mt-4 rounded-lg bg-gray-100 cursor-pointer"
              onClick={() => setTextToCopy(transcript)}
            >
              {transcript || "Click to copy transcribed text"}
            </div>

            {/* UI Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {clipboard.copied ? "Copied!" : "Copy to Clipboard"}
              </button>

              <button
                onClick={startListening}
                disabled={listening}
                className={`px-4 py-2 rounded-md text-white transition ${
                  listening
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                🎤 {listening ? "Listening..." : "Start Listening"}
              </button>

              <button
                onClick={stopListening}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                ⛔ Stop Listening
              </button>
            </div>

            {/* Listening Indicator */}
            {listening && (
              <p className="mt-4 text-green-600 font-medium animate-pulse">
                🔊 Listening...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
