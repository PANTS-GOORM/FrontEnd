import React from "react";
import Modal from "./Modal";

interface FailModalProps {
  onClose: () => void;
}

const FailModal: React.FC<FailModalProps> = ({ onClose }) => (
  <Modal onClose={onClose} color="red">
    {" "}
    {/* 색상 전달 */}
    <p className="text-xl text-center">실패...</p>
  </Modal>
);

export default FailModal;
