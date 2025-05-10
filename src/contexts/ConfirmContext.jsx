import { createContext, useState, useContext } from "react";
import ConfirmModal from "@modals/ConfirmModal";

export const ConfirmContext = createContext(); 

export const ConfirmProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [resolve, setResolve] = useState(null);

  const openConfirmModal = (title, message) => {
    setTitle(title);
    setMessage(message);
    setIsOpen(true);

    return new Promise((res) => {
      setResolve(() => res);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolve(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolve(false);
  };

  return (
    <ConfirmContext.Provider value={{ openConfirmModal }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        title={title}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);