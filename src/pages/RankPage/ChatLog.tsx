import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

interface ChatLogProps {
  messages: { message: string; sender: string }[];
}

const ChatLog: React.FC<ChatLogProps> = ({ messages }) => {
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatLogRef}
      className="chat-log"
      style={{ overflowY: "scroll", maxHeight: "150px" }}
    >
      {messages.map((msg, idx) => (
        <ChatMessage
          key={`chatMessage_${idx}`}
          message={msg.message}
          sender={msg.sender}
        />
      ))}
    </div>
  );
};

export default ChatLog;
