import React, { useState, useEffect, useRef } from "react";
import heartImage from "../../../../assets/img/learning/heart.png";

// Props 타입 정의
// interface CurrentRoundProps {
//   round: number;
// }
// const CurrentRound: React.FC<CurrentRoundProps> = ({ round }) => {

const remainingTries = 3;

const AnswerInput = () => {
  const [word, setWord] = useState<string>("");
  const [hearts, setHearts] = useState<number>(3);
  const [correctAnswer, setCorrectAnswer] = useState<{
    isCorrect: boolean;
    sentence: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const checkSentence = () => {
    if (hearts == 0) {
      setWord("");
      return;
    }

    const desiredSentence = "누워서 떡 먹기"; // 공백 없는 형태로 설정
    // 사용자 입력에서 모든 공백을 제거
    const inputSentence = word.replace(/\s+/g, "");
    if (inputSentence === desiredSentence.replace(/\s+/g, "")) {
      // 정답인 경우
      setCorrectAnswer({ isCorrect: true, sentence: word }); // 원래 입력된 문장을 표시
    } else {
      // 틀린 경우 하트를 하나 제거하고 정답 상태를 초기화합니다.
      setHearts(hearts - 1);
      setCorrectAnswer(null);
    }
    setWord(""); // 입력 필드 초기화
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      if (inputRef.current && document.activeElement === inputRef.current) {
        checkSentence();
      } else {
        inputRef.current?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 h-32">
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
