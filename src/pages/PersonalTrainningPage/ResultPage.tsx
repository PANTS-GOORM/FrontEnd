import React from "react";
import learningStore from "../../store/learning";

const ResultPage: React.FC = () => {
  const learnedWordCount = learningStore((state) => state.learnedWordCount);
  const totalWords = learningStore((state) => state.amount);

  const btn_menu = [
    {
      title: "홈으로",
      link: "/",
    },
    {
      title: "다시 학습하기",
      link: "/learning",
    },
  ];
  return (
    <div className="relative flex flex-col justify-center items-center h-screen text-white">
      <div className="text-4xl font-bold mb-4">맞춘 단어 개수:</div>
      <div className="text-6xl font-bold mb-8">
        {learnedWordCount}/{totalWords}개
      </div>
      {learnedWordCount === totalWords ? (
        <div className="mb-8">🎉 완벽하게 모두 맞췄어요! 🎉</div>
      ) : (
        <div className="mb-8">조금 더 노력해 볼까요?</div>
      )}

      <div className="flex justify-center">
        {btn_menu.map((data) => (
          <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline mr-4">
            <a href={data.link}>
              <p className="inline-block md:text-center">{data.title}</p>
            </a>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
