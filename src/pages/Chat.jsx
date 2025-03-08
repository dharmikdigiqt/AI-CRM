import { useState } from "react";
import { Card } from "../components/common/Card";
import VoiceChatUi from "./VoiceChatUi";
import ChatUi from "./ChatUi";

const Chat = () => {
  const [objections, setObjections] = useState(null);
  
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
        </div>
      </div>
    </>
  );
};

export default Chat;
