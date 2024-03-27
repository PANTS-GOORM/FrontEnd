import React, { useState } from "react";
import VocabularyExplain from "../../components/features/Learning/VocabularyExplain/VocabularyExplain";
import CurrentRound from "../../components/features/Learning/CurrentRound/CurrentRound";
import ImageContent from "../../components/features/Learning/ImageContent/ImageContent";
import heartImage from "../../assets/img/learning/heart.png";
import AnswerInput from "../../components/features/Learning/AnswerInput/AnswerInput";

const Learning: React.FC = () => {

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <CurrentRound />
      <VocabularyExplain />
      <ImageContent />
      <AnswerInput />
    </div>
  );
};

export default Learning;
