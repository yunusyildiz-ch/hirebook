import { useState, useContext, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { ChatContext } from "@contexts/ChatContext";
import { getDialogflowResponse } from "@/services/dialogflowService";
import { CgBot } from "react-icons/cg";
import { IoSend } from "react-icons/io5";

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addMessage } = useContext(ChatContext);
  const inputRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Gönderim fonksiyonu
  const handleSend = async () => {
    if (!userMessage.trim()) return;
    addMessage("user", userMessage);
    setUserMessage("");

    try {
      const response = await getDialogflowResponse(userMessage);
      addMessage("bot", response);
    } catch (error) {
      addMessage("bot", "Connection error. Please try again.");
    }
  };

  // Chatbot açıldığında input alanına odaklan
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Tıklama ve Sürükleme Ayırma
  const handleClick = () => {
    if (!isDragging) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <Rnd
      default={{
        x: 20,
        y: 20,
        width: 300,
        height: "auto",
      }}
      bounds="window"
      minWidth={250}
      minHeight={100}
      enableResizing={false}
      className="fixed z-50 cursor-pointer"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
    >
      <div className="relative">
        {/* Toggle Button */}
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            onClick={handleClick}
            className="p-2 border border-black dark:border-white text-dark rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <CgBot size={40} />
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
              Drag & Click to open!
            </div>
          )}
        </div>

        {/* Chatbot Panel */}
        {isOpen && (
          <div
            className="mt-2 border bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-80"
            style={{ zIndex: 1000 }}
          >
            <h2 className="text-lg font-semibold mb-2 select-none">
              Qatip CatBot
            </h2>
            <div className="h-64 text-sm overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-xs p-2 rounded-lg shadow-md ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-300 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <span className="absolute right-0 top-0 -mr-2 -mt-2 bg-blue-500 text-white  rounded-full px-2 py-0.5 text-xs">
                        You
                      </span>
                    ) : (
                      <span className="absolute left-0 top-0 -ml-2 -mt-2 bg-gray-300 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                        CatBot
                      </span>
                    )}
                    <p className="break-words">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                className=" text-sm flex-1 p-1 ring-1 ring-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-skyBlue focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-skyBlue text-white px-3 py-1 rounded hover:bg-skyBorder transition flex items-center justify-center"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Rnd>
  );
}













