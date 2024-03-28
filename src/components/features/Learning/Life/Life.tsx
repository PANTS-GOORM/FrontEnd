import React, { useState } from "react";
import heartIcon from "../../../../assets/img/learning/heart.png";

// Props 타입 정의
// interface CurrentRoundProps {
//   round: number;
// }
// const CurrentRound: React.FC<CurrentRoundProps> = ({ round }) => {

const Life = () => {
  const [hearts, setHearts] = useState<number>(3);
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
