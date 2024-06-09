import React from "react";

interface ChatMessageProps {
  message: string;
  sender: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div className="chat-message">
      <strong>{sender}:</strong> {message}
    </div>
  );
};

export default ChatMessage;
