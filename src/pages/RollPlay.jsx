import { useState } from "react";
import { Card } from "../components/common/Card";
import RollPlayChatUi from "./RollPlayChatUi";

const RollPlay = () => {
  const [start, setStart] = useState(false);

  return (
    <div
      className={`grid gap-4 transition-all ${
        start ? "grid-cols-12" : "grid-cols-1"
      }`}
    >
      {/* Card takes 4 columns when start is true, otherwise full width */}
      <div
        className={`${
          start ? "col-span-4" : "col-span-12"
        } flex justify-center`}
      >
        <Card className="p-6 flex flex-col gap-4 border-none rounded-xl bg-[#3C5AA7] text-white max-w-md">
          <h2 className="text-xl font-semibold">Roll Play</h2>
          <p className="opacity-80">
            Experience real-time interactions with AI like you're dealing with a
            real customer. See how it feels to chat with technology that
            understands your needs.
          </p>
          <button
            className="bg-white text-[#3C5AA7] px-4 py-2 rounded-md font-semibold cursor-pointer"
            onClick={() => setStart(true)}
          >
            Let's Start
          </button>
        </Card>
      </div>

      {/* Chat UI takes 8 columns when start is true */}
      {start && (
        <div className="col-span-8">
          <RollPlayChatUi />
        </div>
      )}
    </div>
  );
};

export default RollPlay;
