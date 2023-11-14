import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { v4 } from "uuid";
import "./consoleSection.css";

interface ConsoleSectionProps {}

interface consolefeed {
  type: string;
  msg: string;
  line?: number;
}

const ConsoleSection: React.FC<ConsoleSectionProps> = ({}) => {
  const [consoleFeed, setConsoleFeed] = useState<consolefeed[]>([]);

  useEffect(() => {
    setConsoleFeed(() => []);
    window.addEventListener("message", (e) => {
      const data = e.data;
      if (data.type === "log") {
        setConsoleFeed((prev) => [...prev, { type: "log", msg: data.args }]);
      } else if (data.type === "error") {
        setConsoleFeed((prev) => [
          ...prev,
          { type: "error", msg: `${data.args}` },
        ]);
      }
    });
  }, []);

  return (
    <>
      <div className=" console-header ">
        <p>Console</p>
        <FaTrash
          onClick={() => {
            setConsoleFeed([]);
          }}
          className="cursor-pointer ml-5"
        />
      </div>
      <div className="console-body">
        {consoleFeed.map((feed) => (
          <>
            <p
              key={v4()}
              className={feed.type === "error" ? "text-red" : "text-white"}
            >
              {feed.msg}
            </p>{" "}
            <hr />
          </>
        ))}
      </div>
    </>
  );
};

export default ConsoleSection;
