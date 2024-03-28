import React from "react";

// Props 타입 정의
// interface CurrentRoundProps {
//   round: number;
// }
// const CurrentRound: React.FC<CurrentRoundProps> = ({ round }) => {

const ImageContent = () => {
  return (
    <div className="flex items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-96 h-96">
      <img
        src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910"
        alt="content"
      />
    </div>
  );
};

export default ImageContent;
