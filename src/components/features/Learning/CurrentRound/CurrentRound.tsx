import React from "react";
import learningStore from "../../../../store/learning";

const CurrentRound = () => {
  const round = learningStore((state) => state.round);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center">
        현재 {round} 라운드
      </div>
    </div>
  );
};

export default CurrentRound;
