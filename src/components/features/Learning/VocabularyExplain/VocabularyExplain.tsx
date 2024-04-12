import React, { useState } from "react";
import infoIcon from "../../../../assets/img/learning/infoIcon.png";
import learningStore from "../../../../store/learning";

const VocabularyExplain = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const problemDescription = learningStore(
    (state) =>
      state.contents[state.round - 1]?.problemDescription ||
      "문제 설명을 불러오는 데 실패했습니다."
  );
  return (
    <div className="flex justify-center items-center">
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
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
              해당 문제에 맞는 답을 해주세요
            </div>
          )}
        </div>
        <span>{problemDescription}</span>
      </div>
    </div>
  );
};

export default VocabularyExplain;
