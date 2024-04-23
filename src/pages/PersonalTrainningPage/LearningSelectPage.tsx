import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import learningStore from "../../store/learning";

const LearningSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const loadContents = learningStore((state) => state.loadContents);
  const resetRound = learningStore((state) => state.resetRound);
  const setAmount = learningStore((state) => state.setAmount);
  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    // 추가적인 로직 (예: 상태 관리 라이브러리에 저장, 페이지 네비게이션 등)
  };

  const handleStart = () => {
    if (selectedAmount) {
      // resetAmount();
      setAmount(selectedAmount);
      resetRound();
      loadContents("속담", selectedAmount);
      navigate("/learning");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white font-bold mb-8">
        문제 개수를 선택하세요
      </h1>
      <div className="flex">
        {[5, 10, 15].map((amount) => (
          <button
            key={amount}
            className={`text-xl px-6 py-3 rounded-full mx-2 focus:outline-none ${
              selectedAmount === amount
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
            onClick={() => handleSelectAmount(amount)}
          >
            {amount}문제
          </button>
        ))}
      </div>
      <button
        className="mt-8 bg-yellow-300 text-white px-6 py-3 rounded-full text-xl font-bold hover:bg-yellow-400 disabled:opacity-50"
        onClick={handleStart}
        disabled={!selectedAmount}
      >
        START
      </button>
    </div>
  );
};

export default LearningSelectPage;
