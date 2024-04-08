import React from "react";
import Modal from "./Modal";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => (
  <Modal onClose={onClose} color="green">
    {" "}
    {/* 색상 전달 */}
    <p className="text-xl text-center">성공!</p>
  </Modal>
);

export default SuccessModal;
