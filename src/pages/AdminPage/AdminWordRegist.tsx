import React, { useState } from "react";
import useStore from "../../store/adminWord";

const AdminWordRegist: React.FC = () => {
  const [word, setWord] = useState("");
  const { words, addWord } = useStore((state) => state);

  const handleChange = (e) => {
    setWord(e.target.value);
  };
  const handleClickAddWord = () => {
    addWord(word);
    setWord("");
    console.log(words);
  };
  return (
    <div className="flex justify-center">
      <div>
        <h1>관리자 어휘 등록 페이지</h1>
        <input
          className="m-3"
          type="text"
          value={word}
          onChange={handleChange}
        ></input>
        <button onClick={handleClickAddWord}>단어 등록</button>
      </div>
    </div>
  );
};

export default AdminWordRegist;
