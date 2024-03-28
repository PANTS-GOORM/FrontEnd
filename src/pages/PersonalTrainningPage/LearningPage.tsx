import React from "react";
import VocabularyExplain from "../../components/features/Learning/VocabularyExplain/VocabularyExplain";
import CurrentRound from "../../components/features/Learning/CurrentRound/CurrentRound";
import ImageContent from "../../components/features/Learning/ImageContent/ImageContent";
import AnswerInput from "../../components/features/Learning/AnswerInput/AnswerInput";
import Life from "../../components/features/Learning/Life/Life";

const Learning: React.FC = () => {
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

export default Learning;
