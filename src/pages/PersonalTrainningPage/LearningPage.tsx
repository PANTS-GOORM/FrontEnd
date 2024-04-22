import React, { useEffect } from "react";
import VocabularyExplain from "../../components/features/Learning/VocabularyExplain/VocabularyExplain";
import CurrentRound from "../../components/features/Learning/CurrentRound/CurrentRound";
import ImageContent from "../../components/features/Learning/ImageContent/ImageContent";
import AnswerInput from "../../components/features/Learning/AnswerInput/AnswerInput";
import Life from "../../components/features/Learning/Life/Life";
import learningStore from "../../store/learning";
const LearningPage: React.FC = () => {
  const loadContents = learningStore((state) => state.loadContents);
  const resetRound = learningStore((state) => state.resetRound);
  const resetAmount = learningStore((state) => state.resetAmount);
  const amount = learningStore((state) => state.amount);
  resetAmount();
  resetRound();
  useEffect(() => {
    loadContents("속담", amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
