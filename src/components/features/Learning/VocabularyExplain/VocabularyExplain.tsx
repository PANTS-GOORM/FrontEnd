import React, { useState } from "react";
import infoIcon from "../../../../assets/img/learning/infoIcon.png";

// Props 타입 정의
// interface VocabularyExplainProps {
//   explain: string;
// }
// const VocabularyExplain: React.FC<VocabularyExplainProps> = ({ explain }) => {

const explain = "하기가 매우 쉬운 것을 비유적으로 이르는 말";

const VocabularyExplain = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center text-lg font-semibold bg-white bg-opacity-70 rounded p-4 text-center">
        <div className="relative">
          <img
            src={infoIcon}
            alt="정보 아이콘"
            className="w-8 h-8 mr-2"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          />
          {isTooltipVisible && (
            // left-1/2 transform -translate-x-1/2: 요소를 수평 중앙에 정렬
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
              어휘에 대한 설명
            </div>
          )}
        </div>
        <span>{explain}</span>
      </div>
    </div>
  );
};

export default VocabularyExplain;
