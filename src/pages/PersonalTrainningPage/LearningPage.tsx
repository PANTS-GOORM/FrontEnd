import React, { useEffect } from "react";
import VocabularyExplain from "../../components/features/Learning/VocabularyExplain/VocabularyExplain";
import CurrentRound from "../../components/features/Learning/CurrentRound/CurrentRound";
import ImageContent from "../../components/features/Learning/ImageContent/ImageContent";
import AnswerInput from "../../components/features/Learning/AnswerInput/AnswerInput";
import Life from "../../components/features/Learning/Life/Life";
import learningStore from "../../store/learning";
const LearningPage: React.FC = () => {
  const loadContents = learningStore((state) => state.loadContents);
  useEffect(() => {
    // 특정 타입과 수량을 지정해서 내용을 로드합니다.
    // 예를 들어, '단어' 타입의 내용을 10개 로드하는 경우입니다.
    loadContents("속담", 3);
  }, [loadContents]); // 의존성 배열에 loadContents를 추가합니다.
  return (
    <div className="relative flex flex-col justify-center items-center h-screen gap-4">
      <div className="absolute top-0 right-0">
        <Life />
      </div>
      <CurrentRound />
      <VocabularyExplain />
      <ImageContent />
      <AnswerInput />
    </div>
  );
};

export default LearningPage;
