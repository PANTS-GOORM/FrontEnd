import React from "react";
import learningStore from "../../../../store/learning";

const ImageContent = () => {
  const contentURL = learningStore(
    (state) => state.contents[state.round - 1]?.contentURL || "기본 이미지 URL"
  );
  return (
    <div className="flex items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-96 h-96">
      <img src={contentURL} alt="content" />
    </div>
  );
};

export default ImageContent;
