import React from "react";
import heartIcon from "../../../../assets/img/learning/heart.png";
import learningStore from "../../../../store/learning"; // 올바른 경로로 수정

const Life = () => {
  const hearts = learningStore((state) => state.hearts); // Zustand 스토어에서 하트 수 가져오기

  const heartArr: React.ReactNode[] = [];

  for (let i = 0; i < hearts; ++i) {
    heartArr.push(
      <img key={i} src={heartIcon} alt="Heart" className="w-16 h-16" />
    );
  }

  return (
    <div className="flex justify-center items-center mt-4">{heartArr}</div>
  );
};

export default Life;
