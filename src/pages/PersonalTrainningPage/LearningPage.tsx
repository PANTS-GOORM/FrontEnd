import { useState } from "react";
import React from "react";
import useStore from "../../store/learning";
import VocabularyExplain from "../../components/features/Learning/VocabularyExplain/VocabularyExplain";
import CurrentRound from "../../components/features/Learning/CurrentRound/CurrentRound";

const Learning: React.FC = () => {
  const words = useStore((state) => state.words); // Zustand 스토어에서 words 배열을 가져옵니다.
  const [word, setWord] = useState<string>("");
  const addWord = useStore((state) => state.addWord);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWord(word);
    setWord("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <CurrentRound />
      <VocabularyExplain />
    </div>
  );
};

export default Learning;
