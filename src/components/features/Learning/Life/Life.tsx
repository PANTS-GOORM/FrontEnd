import React, { useState } from "react";
import heartImage from "../../../../assets/img/learning/heart.png";

// Props 타입 정의
// interface CurrentRoundProps {
//   round: number;
// }
// const CurrentRound: React.FC<CurrentRoundProps> = ({ round }) => {

const Life = () => {
  const [hearts, setHearts] = useState<number>(3);

  return <div className="flex justify-center items-center mt-4">2</div>;
};

export default Life;
