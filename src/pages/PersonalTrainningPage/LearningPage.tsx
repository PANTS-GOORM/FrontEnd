import React, { useState } from "react";
import VocabularyExplain from "../../components/features/Learning/VocabularyExplain/VocabularyExplain";
import CurrentRound from "../../components/features/Learning/CurrentRound/CurrentRound";
import ImageContent from "../../components/features/Learning/ImageContent/ImageContent";
import heartImage from "../../assets/img/learning/heart.png";

const Learning: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [hearts, setHearts] = useState<number[]>([1, 2, 3]);
  const [correctAnswer, setCorrectAnswer] = useState<{
    isCorrect: boolean;
    sentence: string;
  } | null>(null);

  const checkSentence = () => {
    const desiredSentence = "누워서 떡 먹기"; // 공백 없는 형태로 설정
    // 사용자 입력에서 모든 공백을 제거
    const inputSentence = word.replace(/\s+/g, "");
    if (inputSentence === desiredSentence.replace(/\s+/g, "")) {
      // 정답인 경우
      setCorrectAnswer({ isCorrect: true, sentence: word }); // 원래 입력된 문장을 표시
    } else {
      // 틀린 경우 하트를 하나 제거하고 정답 상태를 초기화합니다.
      setHearts(hearts.slice(0, -1));
      setCorrectAnswer(null);
    }
    setWord(""); // 입력 필드 초기화
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      checkSentence();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <CurrentRound />
      <VocabularyExplain />
      <ImageContent />
      <div className="flex flex-col items-center">
        <div className="mb-4">속담을 입력하세요</div>
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new word"
            className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={checkSentence}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
          >
            Check
          </button>
        </form>
        <div className="flex justify-center items-center mt-4">
          {hearts.map((_, index) => (
            <img key={index} src={heartImage} alt="Heart" className="w-24" />
          ))}
        </div>
        {correctAnswer && correctAnswer.isCorrect && (
          <div className="mt-4 text-green-600">
            정답! 입력하신 문장: {correctAnswer.sentence}
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
