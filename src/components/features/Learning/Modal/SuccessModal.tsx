import React from "react";
import Modal from "./Modal";
import learningStore from "../../../../store/learning";
interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => (
  <Modal onClose={onClose} color="green">
    <div>성공하셨습니다</div>
    <div>
      정답은{" "}
      {learningStore(
        (state) => state.contents[state.round - 1]?.vocabulary || ""
      )}{" "}
      입니다.
    </div>
  </Modal>
);

export default SuccessModal;
