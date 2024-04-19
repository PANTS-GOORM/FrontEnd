import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AdminWord {
  vocabulary: string;
  description: string;
  type: string;
}

const AdminWordRegist: React.FC = () => {
  const [vocabulary, setVocabulary] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const navigate = useNavigate();

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
    setIsButtonDisabled(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adminWord: AdminWord = { vocabulary, description, type };
    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/wordregist`, adminWord, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("등록 성공!");
          setVocabulary("");
          setDescription("");
          setType("");
          setIsButtonDisabled(true);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 409) {
          alert("중복된 어휘입니다.");
          setVocabulary("");
          setDescription("");
          setType("");
          setIsButtonDisabled(true);
        } else {
          alert("등록 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-center">어휘 등록</h1>
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
              disabled={isButtonDisabled}
              className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              어휘 등록
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-blue-700"
        >
          관리자 페이지로
        </button>
      </div>
    </div>
  );
};

export default AdminWordRegist;
