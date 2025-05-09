"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface MessageData {
  message: string;
}

let socket: Socket;

const Page = () => {
  const [message, setMessage] = useState("hello");
  const [receiveMessage, setReceiveMessage] = useState("");

  useEffect(() => {
    socket = io("http://localhost:3001");

    const handleReceive = (data: MessageData) => {
      setReceiveMessage(data.message);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { message });
      setMessage("hello");
    }
  };

  return (
    <div className="justify-center text-center">
      <input
        className="border pr-2 pl-3 rounded mt-10"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />{" "}
      <br />
      <button
        onClick={sendMessage}
        className="border text-md py-2 mt-5 px-3 cursor-pointer"
      >
        Send Message
      </button>

      <h1 className="text-teal-700 mt-5">
        Message: {receiveMessage}
      </h1>
    </div>
  );
};

export default Page;
