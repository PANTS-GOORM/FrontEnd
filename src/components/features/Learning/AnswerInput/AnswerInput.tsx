import React, { useState, useEffect, useRef } from "react";
import learningStore from "../../../../store/learning"; // Zustand store의 경로를 올바르게 지정해주세요.
import SuccessModal from "../Modal/SuccessModal"; // 올바른 경로로 수정
import FailModal from "../Modal/FailModal"; // 올바른 경로로 수정

const AnswerInput: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const hearts = learningStore((state) => state.hearts);
  const removeHeart = learningStore((state) => state.removeHeart);
  // const resetHearts = learningStore((state) => state.resetHearts);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailModal, setShowFailModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextRound = learningStore((state) => state.nextRound);
  const vocabulary = learningStore(
    (state) => state.contents[state.round - 1]?.vocabulary || ""
  );
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, []);

  useEffect(() => {
    if (showSuccessModal || showFailModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setShowFailModal(false);
      }, 2000); // 모달을 2초 동안 보여준 후 숨깁니다.

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, showFailModal, nextRound]);

  const checkSentence = () => {
    const inputSentence = word.replace(/\s+/g, "");

    if (inputSentence === vocabulary.replace(/\s+/g, "")) {
      console.log("정답입니다!!");
      setShowSuccessModal(true);
      nextRound(); // 다음 라운드로 넘어가기
    } else {
      if (hearts === 1) {
        setShowFailModal(true);
        nextRound(); // 실패 모달 표시 후 다음 라운드로
      } else {
        removeHeart();
      }
    }
    setWord("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkSentence();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 h-32">
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      {showFailModal && <FailModal onClose={() => setShowFailModal(false)} />}
      <form
        className="flex items-center h-full w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={inputRef}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`남은 정답 시도 횟수: ${hearts}회`}
          className="placeholder-gray-400 border-4 border-black w-full h-full px-4 py-2 rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </form>
      <div className="w-full text-sm text-center px-2">
        enter 키로 활성화, enter키로 정답 제출
      </div>
    </div>
  );
};

export default AnswerInput;
