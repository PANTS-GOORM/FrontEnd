import React from "react";
import Modal from "./Modal";
import learningStore from "../../../../store/learning";
interface FailModalProps {
  onClose: () => void;
}

const FailModal: React.FC<FailModalProps> = ({ onClose }) => (
  <Modal onClose={onClose} color="red">
    {" "}
    {/* 색상 전달 */}
    <div>실패하셨습니다</div>
    <div style={{ color: "green" }}>
      정답은{" "}
      {learningStore(
        (state) => state.contents[state.round - 1]?.vocabulary || ""
      )}{" "}
      입니다.
    </div>
  </Modal>
);

export default FailModal;
