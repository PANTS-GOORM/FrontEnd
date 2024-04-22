import React, { useState, useEffect, useRef } from "react";
import learningStore from "../../../../store/learning"; // Zustand store의 경로를 올바르게 지정해주세요.
import SuccessModal from "../Modal/SuccessModal"; // 올바른 경로로 수정
import FailModal from "../Modal/FailModal"; // 올바른 경로로 수정
import { useNavigate } from "react-router-dom";

const AnswerInput: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const hearts = learningStore((state) => state.hearts);
  const removeHeart = learningStore((state) => state.removeHeart);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailModal, setShowFailModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextRound = learningStore((state) => state.nextRound);
  const round = learningStore((state) => state.round);
  const amount = learningStore((state) => state.amount);
  const vocabulary = learningStore(
    (state) => state.contents[state.round - 1]?.vocabulary || ""
  );
  const increaseLearnedWords = learningStore(
    (state) => state.increaseLearnedWords
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
      // 모달이 열리면 페이지의 상호작용을 막습니다.
      document.body.style.pointerEvents = "none";
      if (inputRef.current) inputRef.current.blur(); // 모달이 보일 때 포커스 제거
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setShowFailModal(false);
        // 모달이 닫히면 페이지의 상호작용을 다시 허용합니다.
        document.body.style.pointerEvents = "auto";
      }, 2000); // 모달을 2초 동안 보여준 후 숨깁니다.

      return () => {
        clearTimeout(timer);
        // 클린업 함수에서도 상호작용을 다시 허용합니다. 모달이 빠르게 재표시될 때 문제를 방지합니다.
        document.body.style.pointerEvents = "auto";
      };
    }
  }, [showSuccessModal, showFailModal]);

  useEffect(() => {
    // 답을 제출한 후 라운드 수와 총 라운드 수가 같을 때만 결과 페이지로 네비게이션합니다.
    if (round > amount && round > 1) {
      navigate("/result");
    }
  }, [round, amount, navigate]); // navigate를 의존성 배열에 포함하여 ESLint 경고 해결

  const checkSentence = () => {
    const inputSentence = word.replace(/\s+/g, "");
    if (inputSentence === vocabulary.replace(/\s+/g, "")) {
      increaseLearnedWords();
      console.log(round);

      setShowSuccessModal(true);
      setTimeout(() => nextRound(), 2000); // 성공 모달 표시 후 2초 뒤 다음 라운드로
    } else {
      if (hearts === 1) {
        setShowFailModal(true);
        setTimeout(() => nextRound(), 2000); // 실패 후 다음 라운드로
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
