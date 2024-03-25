import { useState } from "react";
import React from "react";
import useStore from "../../store/learning";

const Learning: React.FC = () => {
  const words = useStore((state) => state.words); // Zustand 스토어에서 words 배열을 가져옵니다.
  const [word, setWord] = useState<string>("");
  const addWord = useStore((state) => state.addWord);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWord(word);
    setWord("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          단어를 입력하고 엔터나 버튼을 누르면 단어가 추가되는 것 확인 가능
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Add a new word"
            className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Add Word
          </button>
        </form>
        <h2>단어 목록</h2>
        <br />
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li> // words 배열의 각 단어를 리스트 아이템으로 변환하여 표시합니다.
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Learning;
