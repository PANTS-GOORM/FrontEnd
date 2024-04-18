import React, { useState } from "react";
import axios from "axios";

interface AdminWord {
  vocabulary: string;
  description: string;
  type: string;
}

const AdminWordRegist: React.FC = () => {
  const [vocabulary, setVocabulary] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleVocabularyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVocabulary(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adminWord: AdminWord = { vocabulary, description, type };
    axios
      .post(`http://localhost:8081/admin/wordregist`, adminWord, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("등록 성공!");
        } else if (response.status === 409) {
          alert("중복된 어휘입니다.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center">
          관리자 어휘 등록 페이지
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={vocabulary}
              onChange={handleVocabularyChange}
              placeholder="어휘 입력"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="어휘 설명 입력"
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={8}
            />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="mr-5 text-lg font-semibold">어휘 타입 </div>
            <label className="flex items-center">
              <input
                type="radio"
                value="속담"
                checked={type === "속담"}
                onChange={handleTypeChange}
                className="mr-2"
              />
              속담
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="사자성어"
                checked={type === "사자성어"}
                onChange={handleTypeChange}
                className="mr-2"
              />
              사자성어
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="단어"
                checked={type === "단어"}
                onChange={handleTypeChange}
                className="mr-2"
              />
              단어
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            어휘 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminWordRegist;
