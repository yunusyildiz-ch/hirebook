import { useState, useContext, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { ChatContext } from "@contexts/ChatContext";
import { getDialogflowResponse } from "@/services/dialogflowService";
import { CgBot } from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import QatipCatLogo from "@/assets/QatipCatLogo.jsx";

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addMessage } = useContext(ChatContext);
  const inputRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // 🌟 Welcome Baloncuğu

  // Cihazın mobil olup olmadığını kontrol et
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      setShowWelcome(false); // Baloncuk tıklanınca kaybolsun
    }
  };

  // Profesyonel tıklama ve dokunma desteği
  const handlePointerDown = (e) => {
    e.preventDefault();
    if (!isDragging) {
      setIsOpen((prev) => !prev);
      setShowWelcome(false); // Baloncuk tıklanınca kaybolsun
    }
  };

  // Baloncuk gösterimi için useEffect
  useEffect(() => {
    // Baloncuk otomatik olarak 4 saniye sonra kaybolsun
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Rnd
      default={{
        x: isMobile ? 20 : window.innerWidth - 350,
        y: isMobile ? window.innerHeight - 150 : 220,
        width: 300,
        height: "auto",
      }}
      bounds="window"
      minWidth={250}
      minHeight={100}
      enableResizing={false}
      dragHandleClassName="chatbot-drag"
      className="fixed z-[1000] cursor-pointer"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      dragAxis="both"
    >
      <div className="relative">
        {/* Toggle Button */}
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            onClick={!isMobile ? handleClick : undefined}
            onPointerDown={isMobile ? handlePointerDown : undefined}
            className="p-2 border border-black dark:border-white text-dark rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition chatbot-drag"
          >
            <CgBot size={40} />
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
              Drag & Click to open!
            </div>
          )}

          {/* 🗨️ Welcome Message Bubble */}
          {showWelcome && (
            <div
              onClick={() => setShowWelcome(false)}
              className="absolute -top-14  left-1/5 transform -translate-x-1/2 bg-light text-dark text-sm py-1 px-3 rounded-full shadow-lg animate-bounce"
            >
              👋 Hello! I am Qatip Cat!
            </div>
          )}
        </div>

        {/* Chatbot Panel */}
        {isOpen && (
          <div
            className="mt-2 border bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-80 chatbot-drag"
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
                    msg.role === "user" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`relative max-w-xs p-2 rounded-lg shadow-md ${
                      msg.role === "user"
                        ? "bg-skyBlue text-white rounded-br-none"
                        : "bg-gray-300 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <span className="absolute left-0 top-0 -mr-2 -mt-2 bg-blue-500 rounded-full px-1 py-0.5 text-xs">
                        <QatipCatLogo className="h-4" />
                      </span>
                    ) : (
                      <span className="absolute right-0 top-0 -ml-2 -mt-2 bg-gray-300 text-gray-800 rounded-full px-1 py-0.5 text-xs">
                        <CgBot size={17} />
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
                className="text-sm flex-1 p-1 ring-1 ring-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-skyBlue focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                onTouchStart={handleSend} // 🪄 Mobil için touch desteği
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




















