import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  color: string; // 추가된 prop
}

const Modal: React.FC<ModalProps> = ({ children, onClose, color }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div style={{ color: color }}>{children}</div>
    </div>
  </div>
);

export default Modal;
