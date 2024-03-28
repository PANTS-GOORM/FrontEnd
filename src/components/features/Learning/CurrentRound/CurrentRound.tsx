import React from "react";

// Props 타입 정의
// interface CurrentRoundProps {
//   round: number;
// }
// const CurrentRound: React.FC<CurrentRoundProps> = ({ round }) => {

const round = 1;

const CurrentRound = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center">
        현재 {round} 라운드
      </div>
    </div>
  );
};

export default CurrentRound;
