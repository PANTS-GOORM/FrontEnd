import React from "react";
import learningStore from "../../../../store/learning";

const ImageContent = () => {
  const contentURL = learningStore(
    (state) => state.contents[state.round - 1]?.contentURL || "기본 이미지 URL"
  );

  //https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910

  return (
    <div className="flex items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-96 h-96">
      <img src={contentURL} alt="content" />
    </div>
  );
};

export default ImageContent;
